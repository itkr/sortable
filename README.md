sortable
========


# 概要
特定のクラスに簡易的にソート機能をつける（開発中）


# 使い方
``head``タグ内、もしくは``body``タグ内の適当な場所で読み込む

```index.html
<script type="text/javascript" src="sortable.js"></script>
```

対象テーブルに任意のクラス名をつける

```index.html
<table class="target_class_name">
...
```

ページ下部などで初期化する。``init``の引数には対象テーブルにつけたクラス名を指定する

```index.html
<script type="text/javascript">
	$SortableTable.init("target_class_name");
</script>
```
