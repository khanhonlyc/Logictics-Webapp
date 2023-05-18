import { Col, Row, Typography } from "antd";
import { useParams } from "react-router-dom";
import ListCardSmall from "./ListCardSmall";
import { CalendarOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { END_POINT } from "../../../src/utils/constant";
import axios from 'axios';

const NewsDetailBlog = () => {


    const [data, setData] = useState({})
    const param = useParams();
    console.log("param", param.BlogId)

    const getBlogList = async () => {
        try {
            const res = await axios.get(`${END_POINT}/blog/${param.BlogId}`);
            setData(res.data.data)

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getBlogList();
    }, []);

    const params = {
        current: 1,
        pageSize: 1000,
        total: 1000,
        page: 0,
        keyword: null,
        sortBy: null,
        categorys: `${data.categorys}`,
    };

    // hàm gọi api lấy các categorys liên quan
    const [categorys, setCategorys] = useState([])
    const fetchData = async () => {

        try {
            const { data: response } = await axios.get(`${END_POINT}/blog`, {
                params: params,
            });
            setCategorys(response.data.blog);
        } catch (error) {
            console.error(error.message);
        }
    };
    console.log("categorys", categorys)


    useEffect(() => {
        fetchData();
    }, [data]);

    const splitDate = data.date?.split("-");

    //console.log("dataDetail",d[2].substr(0,2)+'-'+d[1]+'-'+d[0])
    return (
        <Row
            style={{ margin: '100px', marginTop: '160px' }}
            gutter={[30, 30]}
        >
            <Col span={16} style={{ marginBottom: '50px' }}>
                <Typography.Title level={1} style={{ fontWeight: '700' }}>{data.categorys}</Typography.Title>
                {/* <h1>{location.pathname}</h1> */}
                {<CalendarOutlined style={{ verticalAlign: 'middle', marginRight: 8 }} />}
                <span style={{ verticalAlign: 'middle' }}>
                    {splitDate?(splitDate[2].substr(0, 2) + '-' + splitDate[1] + '-' + splitDate[0]):''}
                </span>
                <Typography.Title>{data.description}</Typography.Title>
                <Typography.Text>
                    {data.content}
                </Typography.Text>
            </Col>
            <Col span={8}>
                <Typography.Title level={3}>Bài Viết Liên Quan</Typography.Title>
                <ListCardSmall data={categorys} />
            </Col>

        </Row>

    )
}

export default NewsDetailBlog;