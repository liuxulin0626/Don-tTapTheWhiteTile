// 获取随机数
function getRandom(n, m) {
	return Math.floor(Math.random() * (m - n + 1)) + n;
}
// 获取游戏开始按键
const go = document.querySelector(".go");
// 获取游戏主体
const table = document.querySelector("table");
// 定时器id
let timer;
// 分数
let score = 0;
// 游戏开始
function start() {
	// 游戏开始按钮添加事件
	go.addEventListener("click", () => {
		// 点击后隐藏按钮
		go.style.display = "none";
		// 调用移动函数让table动起来
		move();
	});
}
// 执行游戏函数
start();
// 移动
function move() {
	// 清除定时器
	clearInterval(timer);
	// 创建定时器
	timer = setInterval(() => {
		// 获取当前的top值并加上速度值
		table.style.top = parseInt(table.offsetTop) + 5 + "px";
		// 如果回到原位就重新再返回-150px的地方
		if (parseInt(table.offsetTop) >= 0) {
			table.style.top = "-150px";
			// 之后返回顶部后才会创建标签
			createTr();
		}
		// 如果当前容器里面达到6个就删除最后一个
		if (table.children.length >= 6) {
			// 如果要删除的行中有一个没点击的，游戏结束
			if (Array.from(table.lastElementChild.children).some((ele) => +ele.dataset.index == 1)) {
				// 清除定时器
				clearInterval(timer);
				// 弹出游戏结束
				alert(`游戏结束，您的分数是：${score}`);
				// 清空整个table
				table.innerHTML = "";
				// 移除事件委托
				table.removeEventListener("click", clickFk);
				// 重新让开始游戏显示出来
				go.style.display = "block";
			}
			// 由于我在上方加了结束游戏后清空table
			// 清空后table没有东西，还运行下面代码的话会报错，所以用if判断table里是否还有东西
			if (table.children.length > 0) {
				// 删除最后一个元素
				table.children[table.children.length - 1].remove();
			}
		}
	}, 20);
	// 添加事件委托
	table.addEventListener("click", clickFk);
}
// 创建方块
function createTr() {
	// 创建行
	let tr = document.createElement("tr");
	// 创建随机数，随机让一个成为点击对象
	const random = getRandom(0, 3);
	// 循环4次让一行有4个方块
	for (let i = 0; i < 4; i++) {
		// 一次循环创建一个td
		let td = document.createElement("td");
		// 将td插入tr
		tr.appendChild(td);
	}
	// 让随机一个方块变成黑色
	tr.children[random].style.backgroundColor = "black";
	// 给要点击的方块设置一个index
	tr.children[random].dataset.index = 1;
	// 循环完后在table的最前面插入
	table.insertBefore(tr, table.childNodes[0]);
}
// 点击方块事件
function clickFk(e) {
	// 使用事件委托
	// 判断点击的方块index是否为1
	if (e.target.dataset.index == 1) {
		// 点击后改变颜色
		e.target.style.backgroundColor = "gray";
		// 将index设置为0
		e.target.dataset.index = 0;
		// 分数+1
		score++;
	} else {
		// 如果点击的不是需要点击的方块，那么游戏直接结束
		// 清除定时器
		clearInterval(timer);
		// 弹出游戏结束
		alert(`游戏结束，您的分数是：${score}`);
		// 清空整个table
		table.innerHTML = "";
		// 移除事件委托
		table.removeEventListener("click", clickFk);
		// 重新让开始游戏显示出来
		go.style.display = "block";
	}
}
