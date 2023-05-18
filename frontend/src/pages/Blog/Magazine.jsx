import { Row, Col, Button, Typography } from "antd";
import { ArrowDownOutlined, UnorderedListOutlined, ReadOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useState } from "react";
import MagazineItem from "./MagazineItem";
import MagazineItem2 from "./MagazineItem2";
import { useEffect } from 'react';
import { END_POINT } from "../../../src/utils/constant";
import axios from 'axios';

export default function Magazine() {
    

    const [Displayed, setDisplayed] = useState('')
    const [DisplayedNews, setDisplayedNews] = useState('')
    const [getBlogs, setGetBlogs] = useState('')


    const params = {
        current: 1,
        pageSize: 1000,
        total: 1000,
        page: 0,
        keyword: null,
        sortBy: null,
        categorys: "J-Magazine",
    };

    // hàm gọi api
    const [data, setData] = useState([])
    const fetchData = async () => {
        
        try {
            const { data: response } = await axios.get(`${END_POINT}/blog`, {
                params: params,
            });
            setData(response.data.blog);
            console.log("jma¥ata", response)
            setDisplayedNews(response.data.blog.slice(2, 5));
            setDisplayed(response.data.blog.slice(0, 2));
            setGetBlogs(response.data.blog);
        } catch (error) {
            console.error(error.message);
        }
    };
    console.log("jmagezine data", data)

   
    useEffect(() => {
        fetchData();
    }, []);
    console.log('Displayed', Displayed)
    console.log('DisplayedNews', DisplayedNews)

    const handleLoadMore = () => {
        const newData = getBlogs.slice(DisplayedNews.length + 2, DisplayedNews.length + 5)
        setDisplayedNews([...DisplayedNews, ...newData])

    }

    return (
        <div style={{ margin: '50px 200px' }}>
            <Row
                gutter={[30, 30]}
            >
                <Col span={7}></Col>
                <Col span={17} >
                    <div style={{ textAlign: 'right', marginTop: '30px' }}>
                        <Link to="/tin-tuc-noi-bat">
                            <Button  style={{ fontWeight: 'bold', fontSize: '19px', backgroundColor: `white`, width: '200px', borderRadius: '25px', color: `black`, height: '50px' }} className="Red-button">
                                {<UnorderedListOutlined style={{ verticalAlign: 'middle', marginRight: 3 }} />}
                                <span style={{ verticalAlign: 'middle' }}>Tin Tức Nổi Bật</span>
                            </Button>
                        </Link>
                        <Link to="/J-Magazine">
                            <Button  style={{ fontWeight: 'bold', fontSize: '19px', backgroundColor: `red`, width: '200px', borderRadius: '25px', color: `white`, height: '50px' }} className="Red-button">
                                {<ReadOutlined style={{ verticalAlign: 'middle', marginRight: 4 }} />}
                                <span style={{ verticalAlign: 'middle' }}>J-Magazine</span>
                            </Button>
                        </Link>
                        <Link to="/IndustryNews">
                            <Button  style={{ fontWeight: 'bold', fontSize: '19px', backgroundColor: `white`, width: '200px', borderRadius: '25px', color: `black`, height: '50px' }} className="Red-button">
                                {<ReadOutlined style={{ verticalAlign: 'middle', marginRight: 4 }} />}
                                <span style={{ verticalAlign: 'middle' }}>Industry News</span>
                            </Button>
                        </Link>
                    </div>
                </Col>

            </Row>
           
            <Row>
                <Col span={24} style={{ marginTop: '30px' }}>
                    {Displayed ? <MagazineItem Data={Displayed} /> : ""}
                </Col>
            </Row>
            {DisplayedNews ? <MagazineItem2 data={DisplayedNews} /> : ""}
            <div style={{ textAlign: 'center', marginTop: '30px' }}>

                <Button onClick={handleLoadMore} style={{ fontWeight: 'bold', fontSize: '19px', backgroundColor: 'white', borderColor: 'red', width: '200px', color: 'Red', height: '43px' }} >
                    <ArrowDownOutlined />Xem thêm
                </Button>

            </div>
        </div>
    )
}