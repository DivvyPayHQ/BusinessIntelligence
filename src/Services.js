import Data from '../data.json';

// acts as an API call, either resolve or reject to test success/failure scenarios
export default function getBusinessData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
		resolve(Data)}, 2000);
		// reject('Something went wrong')}, 3000);
	});
}
