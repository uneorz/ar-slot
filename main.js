// スロット画像のリスト
const slotImages = new Array(
	"#nge",
	"#nge_gera",
	"#tei",
	"#tei_gera"
);

// スロットの状態とセレクターを保持するクラス
class Slot {
	constructor(state, selector) {
		this.state = state; // -1 : rotate, 0~3 : stop
		this.selector = selector;
	}
}

const slots = new Array(
	new Slot(1, document.querySelector("#slot0")),
	new Slot(3, document.querySelector("#slot1")),
	new Slot(3, document.querySelector("#slot2")),
	new Slot(1, document.querySelector("#slot3"))
)

// スロットの回転状態
let isRotating = false;

const animatedMarker = document.querySelector("#animated-marker");
const startButton = document.querySelector("#startButton");

// aframe-ar.js
AFRAME.registerComponent('markerhandler', {

	init: function () {
		animatedMarker.addEventListener('click', function (ev, target) {

			const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;

			// タッチしたオブジェクトがスタートボタンだった場合
			if (startButton && intersectedElement === startButton) {
				if (isRotating == false) {
					isRotating = true;
					for (let i in slots) { slots[i].state = -1 }
					rotateSlot();
				}
			}

			// タッチしたオブジェクトがスロットだった場合
			for (let i in slots) {
				if (slots[i].selector && intersectedElement === slots[i].selector) {
					if (slots[i].state == -1) {
						rndInt = generateRandomInt();
						slots[i].selector.setAttribute('src', slotImages[rndInt]);
						slots[i].state = rndInt;
					}
				}
			}
		});
	}
});

// スロットを回転させる
function rotateSlot() {
	if (existsRotatingSlot(slots)) {
		for (let i in slots) {
			if (slots[i].state == -1) {
				slots[i].selector.setAttribute('src', slotImages[generateRandomInt()]);
			}
		}

		setTimeout("rotateSlot()", 50);
	} else {
		isRotating = false;
	}
}

// 0~3の乱数生成
function generateRandomInt() {
	return Math.floor(Math.random() * slotImages.length)
}

// 現在回転しているスロットがあるか
function existsRotatingSlot(slots) {
	for (let i in slots) {
		if (slots[i].state == -1) { return true }
	}
	return false
}


