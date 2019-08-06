/*
	1. 完善布局
	2. 实现懒加载
	   纵向加载
	   动态加载计算要加载的没有列的高度
	3. 动态加载数据
*/ 

// 获取元素方法 -- 封装

var oParent = document.getElementById('container');

// window.addEventListener('load',function(){
// 	imgLoacation('box');
// },false);
//完善布局
function imgLoacation(child){
	var aContent = getChilds(child);
	var imgWidth = aContent[0].offsetWidth;

	var num = ~~(document.documentElement.clientWidth/imgWidth);
	oParent.style.cssText = 'width:'+imgWidth*num+'px; margin:0 auto';
	
	var heightArr = [];
	aContent.forEach(function(value,index){
		if(index < num){//计算当前每列数的高度
			heightArr.push(value.offsetHeight);
		}else{//超出了序列号，进行内容归位
			var minHeight = Math.min(...heightArr);
			var minIndex = getMinHeightIndex(heightArr,minHeight);
			value.style.position = 'absolute';
			value.style.top = minHeight + 'px'; 
			value.style.left = aContent[minIndex].offsetLeft + 'px'; 
			//更新最小高度
			heightArr[minIndex] = heightArr[minIndex] + value.offsetHeight;
		}
	});
	
}

imgLoacation('box');

function getMinHeightIndex(heightArr,minHeight){
	for(var i in heightArr){
		if(heightArr[i]===minHeight){
			return i;
		}
	}
}

//获取元素
function getChilds(child){
	var tagsAll = oParent.getElementsByTagName('*');
	var childArr = [];
	for(var i=0;i<tagsAll.length;i++){
		if(tagsAll[i].className == child){
			childArr.push(tagsAll[i]);
		}
	}
	return childArr;
}


