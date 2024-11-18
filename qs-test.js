import qs from 'qs'
const query = {

    job: {
        id: {
            equals: '123',
        }

    },

}

const stringifiedQuery = qs.stringify(

    {

        where: query,

    },

    // { addQueryPrefix: true },
    { encoded: false },

)

console.log("stringifiedQuery: ", stringifiedQuery)