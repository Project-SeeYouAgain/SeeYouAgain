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
    public List<Product> getProductList(int sort, Long productId, String category, Boolean location, String myLocation) {
        JPAQuery<Product> query = queryFactory
                .selectFrom(product)
                .where(ltProductId(productId), isLocation(location, myLocation), likeCategory(category))
                .limit(20);

        if (sort == 0) {
            query.orderBy(product.refreshedAt.desc());
        } else {
            query.orderBy(product.price.desc());
        }

        return query.fetch();
    }

    private BooleanExpression ltProductId(Long productId) {
        return productId != null ? product.id.lt(productId) : null;
    }

    private BooleanExpression isLocation(Boolean location, String myLocation) {
        return location ? product.location.contains(myLocation) : null;
    }

    private BooleanExpression likeCategory(String category) {
        return !category.equals("전체") ? product.category.eq(category) : null;
    }
}
