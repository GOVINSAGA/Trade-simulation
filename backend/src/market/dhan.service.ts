import axios from 'axios';

export async function fetchNifty50Stocks() {
    const url =
        'https://ow-scanx-analytics.dhan.co/customscan/fetchdt';

    const payload = {
        data: {
            sort: 'Mcap',
            sorder: 'desc',
            count: 50,
            params: [
                {
                    field: 'idxlist.Indexid',
                    op: '',
                    val: '13',
                },
                {
                    field: 'Exch',
                    op: '',
                    val: 'NSE',
                },
                {
                    field: 'OgInst',
                    op: '',
                    val: 'ES',
                },
            ],
            fields: [
                'Sym',
                'DispSym',
                'Ltp',
                'Mcap',
                'Pe',
                'Sector',
                'Volume',
            ],
            pgno: 1,
        },
    };

    const headers = {
        accept: 'application/json, text/plain, */*',
        'content-type':
            'application/json; charset=UTF-8',
        origin: 'https://dhan.co',
        referer: 'https://dhan.co/',
        'user-agent': 'Mozilla/5.0',
    };

    const response = await axios.post(
        url,
        payload,
        {
            headers,
        },
    );

    return response.data.data;
}