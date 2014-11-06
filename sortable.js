(function(global, document){

    function getHeadNames(table){
        var thList = table.getElementsByTagName("th");
        var thNames = [];
        var i;
        for(i=0; i<thList.length; i++){
            thNames.push((thList[i].innerHTML).replace(/\s/g, ""));
        }
        return thNames;    
    }

    function getLine(tr){
        var tdList = tr.getElementsByTagName("td");
        var tdValues = {};
        var tmpValue;
        var i;
        for(i=0; i<tdList.length; i++){
            tmpValue = (tdList[i].innerHTML).replace(/\s/g, "");
            if(!isNaN(tmpValue)){
                tmpValue = Number(tmpValue);
            }
            tdValues[i] = tmpValue;
        }
        return tdValues;
    }

    function getLines(table){
        var trList = table.getElementsByTagName("tr");
        var lines = [];
        var i;
        for(i=0; i<trList.length; i++){
            if(i===0){
                continue;
            }
            lines.push(getLine(trList[i]));
        }
        return lines;
    }

    /**
    * テーブル操作用オブジェクト
    */
    var Table = function(node){
        this.node = node;
        this.thNames = getHeadNames(node);
        this.lines = getLines(node);
        this.reverse = false;
        this.sortKey = null;
        this.reload();
    };

    /**
    * テーブルノードの中身を作る
    */
    Table.prototype.make = function(){
        this.node.innerHTML = "";
        var tr = document.createElement("tr");
        var i;
        var th;
        var td;
        for(i=0; i<this.thNames.length; i++){
            th = document.createElement("th");
            th.innerHTML = this.thNames[i];
            if(i == this.sortKey){
                th.innerHTML = th.innerHTML + (this.reverse ? " ▼" : " ▲");
            }
            tr.appendChild(th);
        }
        this.node.appendChild(tr);
        for(i=0; i<this.lines.length; i++){
            tr = document.createElement("tr");
            for(j=0; j<this.thNames.length; j++){
                td = document.createElement("td");
                td.innerHTML = this.lines[i][j];
                tr.appendChild(td);
            }
            this.node.appendChild(tr);
        }
    };

    /**
    * 指定されたキーで内部のデータを並び替え
    */
    Table.prototype.sort = function(sortKey){
        var that = this;
        if(this.sortKey == sortKey){
            this.reverse = !this.reverse;
        }else{
            this.reverse = false;
        }
        this.lines.sort(function(a, b){
            return (a[sortKey] < b[sortKey] ? that.reverse : !that.reverse);
        });
        this.sortKey = sortKey;
    };

    /**
    * テーブルを作り直す
    */
    Table.prototype.reload = function(){
        var thList = this.node.getElementsByTagName("th");
        var i;
        var that = this;
        this.make();

        function setAction(sortKey){
            return function(){
                that.sort(sortKey);
                that.reload();
            };
        }

        for(i=0; i<thList.length; i++){
            thList[i].onclick = setAction(i);
            thList[i].style.cursor = "pointer";
        }
    };

    Table.init = function(class_name){
        var tables = document.getElementsByClassName(class_name);
        var i;
        for(i=0; i<tables.length; i++){
            new Table(tables[i]);
        }
    }
    
    global.$SortableTable = Table;

})(this, this.document);