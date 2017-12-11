angular.module('app', [])

.controller('demoCtrl', ['$scope', function($scope) {

    /*
    	添加任务

    		1.获取用户输入的任务名称
    		2.监听文本框的回车事件
    		3.在事件处理函数中 判断用户输入的内容是否为空
    		4.创建任务列表
    		5.将用户输入的内容添加到任务列表中
    		6.将任务列表中的数据展示在页面中

    */

    // 任务列表
    $scope.taskList = [];
    //从本地取出
    if (localStorage.getItem('taskList')) {
        $scope.taskList = angular.fromJson(localStorage.getItem('taskList'))
    }
    $scope.addTask = function(e) {

        // 如果用户敲击的是回车
        if (e.keyCode == 13) {

            // 如果用户输入了内容
            if ($scope.task) {

                // 将任务添加到任务列表中
                $scope.taskList.push({
                    name: $scope.task,
                    isCompleted: false, // 代表当前任务是否完成
                    isEditing: false // 当前任务是否处于可编辑状态
                });

                // 清空文本框
                $scope.task = "";

                //将数据存到本地
                // localStorage.setItem('taskList', angular.toJson($scope.taskList))

            }

        }

    }

    /*
    	设置任务是否完成的状态
    		
    		完成状态的样式是怎么来的?

    			任务完成了 添加 completed 类名
    			任务未完成 删除 completed 类名

     */

    /*
    	计算未完成任务的数量

    		1.循环任务列表
    		2.判断当前任务是否是未完成任务
    		3.累加

    	当数据发生变化以后 如果这个数据在html中使用了

    	angularjs会去重新渲染模板

     */

    $scope.unCompletedTaskNums = function() {

        var nums = 0;

        for (var i = 0; i < $scope.taskList.length; i++) {

            if (!$scope.taskList[i].isCompleted) {

                nums++;

            }

        }

        return nums;

    }

    /*
    	删除任务

    		1.给删除按钮添加点击事件
    		2.获取到当前点击的任务
    		3.从任务列表中将任务删除

    */

    $scope.deleteTask = function(index) {

        $scope.taskList.splice(index, 1);

    }


    /*
    	批量删除已完成任务

    		1.给删除按钮添加点击事件
    		2.循环任务列表 
    		3.判断当前任务是否是已经完成的任务
    		4.如果判断成立 删除当前任务

     */

    /* true    false

    ['睡觉','打豆豆']

    	0      1*/

    $scope.clearCompletedTask = function() {

        // for (var i = 0; i < $scope.taskList.length; i++) {

        //     if ($scope.taskList[i].isCompleted) {

        //         $scope.taskList.splice(i, 1);

        //         i--;

        //     }

        // }

        for (var i = $scope.taskList.length - 1; i >= 0; i--) {
            if ($scope.taskList[i].isCompleted) {
                $scope.taskList.splice(i, 1);
            }
        }

    }


    /*
    	修改任务名字
    		1.给任务名称添加双击事件(ng-dblclick)
    		2.显示编辑框
    			当任务处于可编辑状态的时候 添加editing类名即可
    			当任务处于不可编辑状态的时候 删除editing类名即可
    		3.将任务名称显示在编辑框内部
    		4.在编辑框离开焦点的时候 保存任务名称

    */

    $scope.modifyTaskName = function(task) {

        // 将所有任务设置成不可编辑状态
        for (var i = 0; i < $scope.taskList.length; i++) {

            $scope.taskList[i].isEditing = false;

        }

        // 将当前任务设置成可编辑状态
        task.isEditing = true;

    }


    $scope.saveTaskName = function(task) {

        task.isEditing = false;

    }

    $scope.condition = "";
    $scope.filterTask = function(type) {
        switch (type) {
            case 'All':
                $scope.condition = "";
                break;
            case 'Active':
                $scope.condition = false;
                break;
            case 'Completed':
                $scope.condition = true;
                break;

        }

    }

    $scope.$watch('taskList', function(newValue, oldValue) {
        localStorage.setItem('taskList', angular.toJson($scope.taskList))
    }, true)


}])