export const COLUMNS = [
    {
        Header:"Made by",
        accessor:'made_by',
        Cell:({value}) =>(value.toString())
    },
    {
        Header:"Request",
        accessor:'request'
    },
    {
        Header:"Platform",
        accessor:'platform'
    },
    {
        Header:"Stepping",
        accessor:'stepping'
    },
    {
        Header:"Enabled Platform Date",
        accessor:'enabled_platform_date'
    },
    {
        Header:"Request Date",
        accessor:'request_date'
    },
    {
        Header:"Request End Date",
        accessor:'request_end_date'
    },
    
]