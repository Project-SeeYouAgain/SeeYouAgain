package com.example.productservice.service;

import com.example.productservice.client.UserServiceClient;
import com.example.productservice.dto.request.ProductListRequestDto;
import com.example.productservice.dto.request.ProductRequestDto;
import com.example.productservice.dto.response.*;
import com.example.productservice.entity.*;
import com.example.productservice.exception.ApiException;
import com.example.productservice.exception.ExceptionEnum;
import com.example.productservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final ProductImgRepository productImgRepository;

    private final ProductTagRepository productTagRepository;

    private final ReservationRepository reservationRepository;

    private final ReviewRepository reviewRepository;

    private final UserServiceClient userServiceClient;

    private final AmazonS3Service amazonS3Service;

    private final CartRepository cartRepository;

    /**
     * explain : 제품 조회
     */
    @Override
    @Transactional(readOnly = true)
    public ProductResponseDto getDetailProduct(Long userId, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        List<ProductImg> productImgList = productImgRepository.findAllByProductId(productId);

        List<ProductTag> productTagList = productTagRepository.findAllByProductId(productId);

        List<Reservation> reservationList = reservationRepository.findAllByProductId(productId);

        List<HashMap<String, String>> reservationMapList = getReservationPeriod(reservationList);

        List<Review> reviewList = reviewRepository.findAllByProductId(productId);

        double totalScore = 0;
        if (reviewList.size() > 0) totalScore = getReviewScoreAvg(reviewList);

        UserClientResponseDto userInfo = userServiceClient.getUserInfo(product.getOwnerId()).getData();

        Optional<Cart> cart = cartRepository.findByUserIdAndProductId(userId, product.getId());

        boolean isCart = cart.isPresent();

        return ProductResponseDto.of(product, productImgList, productTagList, reservationMapList, totalScore, userInfo, isCart, reviewList.size());
    }

    private List<HashMap<String, String>> getReservationPeriod(List<Reservation> reservationList) {
        return reservationList.stream()
                .map(r -> {
                    HashMap<String, String> reservationMap = new HashMap<>();
                    reservationMap.put("startDate", r.getStartDate().toString());
                    reservationMap.put("endDate", r.getEndDate().toString());
                    return reservationMap;
                })
                .collect(toList());
    }

    /**
     * explain : 제품 등록 + 태그, 이미지 등록
     */
    @Override
    @Transactional
    public void createProduct(Long userId, ProductRequestDto requestDto, List<MultipartFile> productImg) {

        Product product = Product.of(userId, requestDto, true, 0, LocalDateTime.now(), false);
        productRepository.save(product);

        List<ProductTag> productTagList = requestDto.getTag().stream().map(t -> ProductTag.of(product, t)).collect(toList());
        productTagRepository.saveAll(productTagList);

        saveProductImg(productImg, product);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductClientResponseDto getProductInfo(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        ProductImg productImg = productImgRepository.findAllByProductId(productId).get(0);

        return ProductClientResponseDto.of(product, productImg.getProductImg());
    }

    /**
     * explain : 제품 수정 + 태그, 이미지 수정
     */
    @Override
    @Transactional
    public void updateProduct(Long userId, Long productId, ProductRequestDto requestDto, List<MultipartFile> productImg) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        if (!product.getOwnerId().equals(userId)) throw new ApiException(ExceptionEnum.OWNER_NOT_MATCH_EXCEPTION);

        // 제품 수정
        product.updateProduct(requestDto);

        updateProductTag(productId, requestDto, product);

        updateProductImg(productId, productImg, product);
    }

    private void updateProductImg(Long productId, List<MultipartFile> productImg, Product product) {
        List<ProductImg> productImgList = productImgRepository.findAllByProductId(productId);
        deleteProductImg(productImgList);
        productImgRepository.deleteAllByProductId(productId);
        saveProductImg(productImg, product);
    }

    private void updateProductTag(Long productId, ProductRequestDto requestDto, Product product) {
        productTagRepository.deleteAllByProductId(productId);
        List<ProductTag> newProductTagList = requestDto.getTag()
                .stream()
                .map(t -> ProductTag.of(product, t))
                .collect(toList());
        productTagRepository.saveAll(newProductTagList);
    }

    /**
     * explain : 제품 삭제
     */
    @Override
    @Transactional
    public void deleteProduct(Long userId, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        if (!product.getOwnerId().equals(userId)) throw new ApiException(ExceptionEnum.OWNER_NOT_MATCH_EXCEPTION);

        reservationRepository.deleteAllByProductId(productId);
        productTagRepository.deleteAllByProductId(productId);
        reviewRepository.deleteAllByProductId(productId);
        cartRepository.deleteAllByProductId(productId);
        List<ProductImg> productImgList = productImgRepository.findAllByProductId(productId);
        deleteProductImg(productImgList);
        productImgRepository.deleteAllByProductId(productId);

        productRepository.delete(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductListResponseDto> getProductList(Long userId, ProductListRequestDto requestDto) {
        List<Product> productList = productRepository
                .getProductList(
                        requestDto.getSort(),
                        requestDto.getProductId(),
                        requestDto.getCategory(),
                        requestDto.getLocation(),
                        requestDto.getMyLocation(),
                        requestDto.getPrice()
                );

        return getProductResponse(productList, userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductListResponseDto> getProductListByKeyword(Long userId,
                                                                ProductListRequestDto requestDto,
                                                                String keyword) {
        List<Product> productList = productRepository.getProductListByKeyword(requestDto.getProductId(), keyword);
        return getProductResponse(productList, userId);
    }

    // hide 체크
    @Override
    @Transactional
    public void updateHide(Long userId, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ExceptionEnum.PRODUCT_NOT_EXIST_EXCEPTION));

        if (!product.getOwnerId().equals(userId))
            throw new ApiException(ExceptionEnum.OWNER_NOT_MATCH_EXCEPTION);
        product.updateProductHide();
    }

    private List<ProductListResponseDto> getProductResponse(List<Product> productList, Long userId) {
        return productList.stream().map(p -> {
            List<Review> reviewList = reviewRepository.findAllByProductId(p.getId());
            double productScoreAverage = 0;
            if (reviewList.size() > 0) productScoreAverage = getReviewScoreAvg(reviewList);

            ProductImg productImg = productImgRepository.findAllByProductId(p.getId()).get(0);

            Optional<Cart> cart = cartRepository.findByUserIdAndProductId(userId, p.getId());

            boolean isCart = cart.isPresent();

            return ProductListResponseDto.of(p, productScoreAverage, productImg.getProductImg(), isCart);
        }).collect(toList());
    }

    private void saveProductImg(List<MultipartFile> productImg, Product product) {
        productImg.forEach(i -> {
            if (!i.isEmpty()) {
                String fileName = saveS3Img(i);
                String fileUrl = amazonS3Service.getFileUrl(fileName);
                ProductImg img = ProductImg.of(product, fileName, fileUrl);
                productImgRepository.save(img);
            }
        });
    }

    private void deleteProductImg(List<ProductImg> productImgList) {
        productImgList.forEach(i -> {
            amazonS3Service.delete(i.getProductKey());
        });
    }

    private String saveS3Img(MultipartFile i) {
        try {
            return amazonS3Service.upload(i, "product");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private double getReviewScoreAvg(List<Review> reviewList) {

        int totalScore = 0;
        for (Review review : reviewList) {
            totalScore += review.getReviewScore();
        }

        return (double) totalScore / reviewList.size();
    }

}
