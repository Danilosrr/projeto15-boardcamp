export function getDayDiff(startDate, endDate) {
    const msInDay = 24 * 60 * 60 * 1000;
  
    return Math.round(
      Math.abs(new Date(endDate) - new Date(startDate)) / msInDay
    );
} 

export function createResponse(obj){
    let response = 
    {
        id: obj.id,
        customerId: obj.customerId,
        gameId: obj.gameId,
        rentDate: obj.rentDate,
        daysRented: obj.daysRented,
        returnDate: obj.returnDate,
        originalPrice: obj.originalPrice,
        delayFee: obj.delayFee,
        customer: {
           id: obj.customerId,
           name: obj.customerName
        },
        game: {
            id: obj.objGameId,
            name: obj.gameName,
            categoryId: obj.categoryId,
            categoryName: obj.categoryName
        }
    }
    return response;
};