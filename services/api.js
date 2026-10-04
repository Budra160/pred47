const apiEndPoint = "https://dummyjson.com/products/";

export async function dohvatiOpremu()
{
    try{
        const response = await fetch(apiEndPoint + "/category/sports-accessories");

        if(!response.ok)
            throw new Error();

        return (await response.json()).products;
    }
    catch(error){
        console.log(error);
    }
}