//HELPER FUNCTIONS

function fetch_arr(genres){
    const arr = [];

    for(let i = 0 ; i < genres.length; i++){
        const genre = genres[i];

        if( genre.genre_category_id === 1 ){
            arr.push(genre);
        }
    }

    
    return arr;
}

function createQuery(arr){
    let query = "INSERT INTO product_category (id, name, created_at) VALUES ";
    
    for ( let i = 0; i < arr.length; i++){
        if( i === arr.length - 1){
            query += `($${i*3+1}, $${i*3+2}, $${i*3+3});`
        }else if (i === 0){
            query += `($${i+1}, $${i+2}, $${i+3}), `
        }else{
            query += `($${i*3+1}, $${i*3+2}, $${i*3+3}),`
        }
    }
    return query;
}

async function fillCategories(err,res){
    const genres = res._body.genres;

    const arr = fetch_arr(genres)
    
    const query = createQuery(arr);
    const date =  new Date();
   
    const params =[];
    for (i = 0; i < arr.length; i++){
        params.push(arr[i].genre_id);
        params.push(arr[i].genre_name);
        params.push(date);
    }

    await db.query(query, params);
}




module.exports = {
    fetch_arr,
    createQuery
};