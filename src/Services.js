import Data from '../data.json';

export const getBusinessData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(Data), 1000);
    });
}