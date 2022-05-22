import Data from '../data.json';

export const getBusinessData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Data), 3000});
            // reject('Something went wrong'), 3000});
    });
}