<?php
$products = array(
    array(
        'images' => array(
            './img/_temp/2db9b6646fd47237ed5b107f36544eb0628a8517.png',
            './img/_temp/3e88ec7396e66ccc41fb928e8a1475c3aa128e2c.png',
            './img/_temp/5e10198cce7768011b758adc4ab6b5460c4ddc32.png',
            './img/_temp/2db9b6646fd47237ed5b107f36544eb0628a8517.png',
            './img/_temp/3e88ec7396e66ccc41fb928e8a1475c3aa128e2c.png',
            './img/_temp/5e10198cce7768011b758adc4ab6b5460c4ddc32.png'
        ),
        'title' => '14k white gold single earring HARD',
        'price' => 360.90,
        'old_price' => 401.00
    ),
    array(
        'images' => array(
            './img/_temp/3e88ec7396e66ccc41fb928e8a1475c3aa128e2c.png',
            './img/_temp/2db9b6646fd47237ed5b107f36544eb0628a8517.png'
        ),
        'title' => '14k white gold single earring HARD',
        'price' => 360.90,
        'old_price' => 401.00
    ),
    array(
        'images' => array(
            './img/_temp/2db9b6646fd47237ed5b107f36544eb0628a8517.png',
            './img/_temp/3e88ec7396e66ccc41fb928e8a1475c3aa128e2c.png',
            './img/_temp/5e10198cce7768011b758adc4ab6b5460c4ddc32.png'
        ),
        'title' => '14k white gold single earring HARD',
        'price' => 360.90,
        'old_price' => 401.00
    ),
    array(
        'images' => array(
            './img/_temp/3e88ec7396e66ccc41fb928e8a1475c3aa128e2c.png'
        ),
        'title' => '14k white gold single earring HARD',
        'price' => 360.90,
        'old_price' => 401.00
    ),
    array(
        'images' => array(
            './img/_temp/3e88ec7396e66ccc41fb928e8a1475c3aa128e2c.png'
        ),
        'title' => '14k white gold single earring HARD',
        'price' => 360.90,
        'old_price' => 401.00
    )
);
?>

<div class="product-cards product-cards__wrapper <?= $blockBgClass ?>">
    <div class="container">
        <div class="product-cards__header">

            <h2 class="h1"><?= htmlspecialchars($blockTitle) ?></h2>
            <div class="product-cards__header-group">
                <div class="button swiper-button-prev"><img src="./img/icons/caret-left-black.svg" alt=""></div>
                <div class="button swiper-button-next"><img src="./img/icons/caret-right-black.svg" alt=""></div>
            </div>
        </div>

        <div class="swiper product-cards__slider">
            <div class="swiper-wrapper">

                <?php foreach ($products as $product): ?>
                    <div class="swiper-slide product-cards__card">

                        <div class="swiper product-card__inner-slider">
                            <div class="swiper-wrapper">

                                <?php foreach ($product['images'] as $img): ?>
                                    <a href="" class="swiper-slide">
                                        <picture>
                                            <img
                                                src="<?= $img ?>"
                                                alt="<?= htmlspecialchars($product['title']) ?>"
                                                loading="lazy"
                                            >
                                        </picture>
                                    </a>
                                <?php endforeach; ?>

                            </div>
                         <div class="button swiper-button-prev"><img src="./img/icons/slider-next.svg" alt=""></div>
                        <div class="button swiper-button-next"><img src="./img/icons/slider-next.svg" alt=""></div>
                        </div>

                        <a href="" class="product-cards__title">
                            <?= htmlspecialchars($product['title']) ?>
                        </a>

                        <div class="product-cards__prices">
                            <span class="price">$<?= number_format($product['price'], 2) ?></span>
                            <span class="price old">$<?= number_format($product['old_price'], 2) ?></span>
                        </div>

                    </div>
                <?php endforeach; ?>

            </div>

 
        </div>
    </div>
</div>
