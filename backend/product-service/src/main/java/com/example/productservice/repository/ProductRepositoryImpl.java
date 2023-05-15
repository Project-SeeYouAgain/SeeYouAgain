package com.example.productservice.repository;

import com.example.productservice.entity.Product;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.example.productservice.entity.QProduct.product;

@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Product> getProductList(int sort, Long productId, String category, Boolean location, String myLocation, Integer price) {

        if (sort == 0) {
            return queryFactory
                    .selectFrom(product)
                    .where(ltProductId(productId), isLocation(location, myLocation), likeCategory(category))
                    .limit(20)
                    .orderBy(product.id.desc())
                    .fetch();
        } else {
            return queryFactory
                    .selectFrom(product)
                    .where(ltPrice(price), isLocation(location, myLocation), likeCategory(category))
                    .limit(20)
                    .orderBy(product.price.desc())
                    .fetch();
        }

//        JPAQuery<Product> query = queryFactory
//                .selectFrom(product)
//                .where(ltProductId(productId), isLocation(location, myLocation), likeCategory(category))
//                .limit(20);
//
//        if (sort == 0) {
//            query.orderBy(product.refreshedAt.desc());
//        } else {
//            query.orderBy(product.price.desc());
//        }
//
//        return query.fetch();
    }

    @Override
    public List<Product> getProductListByKeyword(Long productId, String keyword) {
        return queryFactory
                .selectFrom(product)
                .where(product.title.contains(keyword).and(ltProductId(productId)))
                .orderBy(product.refreshedAt.desc())
                .limit(20)
                .fetch();
    }

    private BooleanExpression ltProductId(Long productId) {
        return productId != null ? product.id.lt(productId) : null;
    }

    private BooleanExpression ltPrice(Integer price) {
        return price != null ? product.price.lt(price) : null;
    }

    private BooleanExpression isLocation(Boolean location, String myLocation) {
        return location ? product.location.contains(myLocation) : null;
    }

    private BooleanExpression likeCategory(String category) {
        return !category.equals("전체") ? product.category.eq(category) : null;
    }
}
