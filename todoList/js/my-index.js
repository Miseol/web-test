$(function() {
    load();
    // 添加 todo
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请先输入任务内容哦！");
            } else {
                // 保存到本地
                var local = getData();
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                //加载
                load();
                $(this).val("");
            }
        }
    });

    // 删除 todo
    $("ol, ul").on("click", "a", function() {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();
    });

    //完成 todo
    $("ol, ul").on("click", "input", function() {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    });
    // 读取本地数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    };

    //保存本地数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    };

    //渲染加载数据
    function load() {
        var data = getData();
        console.log(data);

        // 遍历, 先清空
        $("ol, ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked><span>" + n.title + "</span><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><span>" + n.title + "</span><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    };
})