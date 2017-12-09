angular.module('app',[])

	.controller('demoCtrl',['$scope',function($scope){

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

		$scope.addTask = function(e){

			// 如果用户敲击的是回车
			if(e.keyCode == 13){

				// 如果用户输入了内容
				if($scope.task){

					// 将任务添加到任务列表中
					$scope.taskList.push({
						name: $scope.task,
						isCompleted: false // 代表当前任务是否完成
					});

					// 清空文本框
					$scope.task = "";

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
		
		$scope.unCompletedTaskNums = function(){

			var nums = 0;

			for(var i=0;i<$scope.taskList.length;i++){

				if(!$scope.taskList[i].isCompleted){

					nums++;

				}

			}

			return nums;

		}


	}])


