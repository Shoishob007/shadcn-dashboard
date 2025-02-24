import qs from 'qs'   // qs-esm
const query = {

    "job.organization.organization": {
        equals: '9ec6ab44-5618-4a35-8501-cffb108b433d',
    }
}

const stringifiedQuery = qs.stringify(

    {

        where: query,

    },

    { addQueryPrefix: true },
    // { encoded: false },

)

console.log("stringifiedQuery: ", stringifiedQuery)

// hvho542hoi@knmcadibav.com