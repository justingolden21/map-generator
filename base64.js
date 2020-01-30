// script to encode series of 1s and 0s to base64

const chars = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 + /'.split(' ');

// example
console.log(getBase64([0,1,1,1,0,1,0,0,0,1,1,0,1,1,1,0,1,0,0,0,0,1]) );
console.log(decodeBase64('dG6E') );

function getBase64(arr) {
	let rtn = '';
	// 2^6 = 64
	for(let i=0; i<arr.length; i+=6) {
		let num = '';
		for(let j=0; j<6; j++) {
			if(i+j >= arr.length) {
				num += '0'; // default
			}
			else {
				num += arr[i+j].toString();
			}
		}
		// console.log(num);
		num = parseInt(num, 2); // convert bin to dec
		// console.log(num);
		// console.log(chars[num]);

		rtn += chars[num];
	}
	return rtn;
}

function decodeBase64(val) {
	let rtn = [];
	for(let i=0; i<val.length; i++) {
		let idxOf = chars.indexOf(val[i]);
		// console.log(idxOf);
		let nums = idxOf.toString(2); // base 10 to base 2 str
		// console.log(nums);
		nums = padZeros(nums, 6);
		// console.log(nums);

		for(let j=0; j<nums.length; j++) {
			rtn.push(parseInt(nums[j]) );
		}
	}

	return rtn;
}

function padZeros(nums, len) {
	return '0'.repeat(len - nums.length) + nums;
}