<?php if (!empty($crumbs)): ?>
  <nav class="breadcrumbs <?= isset($breadcrumbsClass) ? $breadcrumbsClass : '' ?>">
    <div class="container">
        <ul>
        <?php foreach ($crumbs as $index => $crumb): ?>
            <?php if ($index > 0): ?>
            <span><img src="./img/icons/caret-right.svg" alt=""></span>
            <?php endif; ?>

            <li>
            <?php if (!empty($crumb['url']) && $index < count($crumbs) - 1): ?>
                <a href="<?= $crumb['url']; ?>"><?= $crumb['title']; ?></a>
            <?php else: ?>
                <span><?= $crumb['title']; ?></span>
            <?php endif; ?>
            </li>

        <?php endforeach; ?>
        </ul>
     </div>
  </nav>
<?php endif; ?>