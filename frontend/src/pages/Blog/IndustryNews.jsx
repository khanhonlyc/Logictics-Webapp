import { Col, Row,Button } from 'antd';
import ListCard from './ListCard';
import { ArrowDownOutlined, UnorderedListOutlined, ReadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { END_POINT } from "../../utils/constant";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TinTucNoiBat() {

    const [TopDisplay, setTopDisplay] = useState('')
    const [BottomDisplay, setBottomDisplay] = useState('')
    const [BlogList, setBlogList] = useState()

    const params = {
        current: 1,
        pageSize: 1000,
        total: 1000,
        page: 0,
        keyword: null,
        sortBy: null,
        categorys: "Industry news",
    };



    // hàm gọi api
    const [data, setData] = useState([])
    const fetchData = async () => {
        
        try {
            const { data: response } = await axios.get(`${END_POINT}/blog`, {
                params: params,
            });
            setData(response.data.blog);
            setBlogList(response.data.blog);
            setBottomDisplay(response.data.blog.slice(0, 4));
            setTopDisplay(response.data.blog.slice(0, 2));
        } catch (error) {
            console.error(error.message);
        }
    };
    console.log("blog data", data)


    // const getBlogList = async () => {
    //     try {
    //         const res = await axios.get(`${END_POINT}/blog`);
    //         setBlogList(res.data.data.blog);
    //         setBottomDisplay(res.data.data.blog.slice(2, 4));
    //         setTopDisplay(res.data.data.blog.slice(0, 2));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    useEffect(() => {
        //getBlogList();
        fetchData()
    }, []);
    // console.log('BlogList', BlogList)
    // console.log('TopDisplay', TopDisplay)


    const handleLoadMore = () => {
        const newData = BlogList.slice(BottomDisplay.length + 2, BottomDisplay.length + 5)
        setBottomDisplay([...BottomDisplay, ...newData])

    }
    return (

        <div style={{ margin: '50px 200px' }} >
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
                            <Button  style={{ fontWeight: 'bold', fontSize: '19px', backgroundColor: `white`, width: '200px', borderRadius: '25px', color: `black`, height: '50px' }} className="Red-button">
                                {<ReadOutlined style={{ verticalAlign: 'middle', marginRight: 4 }} />}
                                <span style={{ verticalAlign: 'middle' }}>J-Magazine</span>
                            </Button>
                        </Link>
                        <Link to="/IndustryNews">
                            <Button  style={{ fontWeight: 'bold', fontSize: '19px', backgroundColor: `red`, width: '200px', borderRadius: '25px', color: `white`, height: '50px' }} className="Red-button">
                                {<ReadOutlined style={{ verticalAlign: 'middle', marginRight: 4 }} />}
                                <span style={{ verticalAlign: 'middle' }}>Industry News</span>
                            </Button>
                        </Link>
                    </div>
                </Col>
                <Col span={16}>
                    {/* {TopDisplay ? <BlogItem Data={TopDisplay} /> : ''} */}
                    </Col>
                <Col span={8}>
                    <div>
                        {/* {BlogList ? <ListCardSmall Data={BlogList} /> : ""} */}
                    </div>

                </Col>

            </Row>
            <Row
                gutter={[30, 30]}
                style={{ margin: '60px 0' }}
            >
                <Col span={18}>
                    <div>
                        {BottomDisplay ? <ListCard Data={BottomDisplay} /> : ""}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {/* {BottomDisplay.length + 2 < BlogList.length && ( */}
                        <Button onClick={handleLoadMore} style={{ fontWeight: 'bold', fontSize: '19px', backgroundColor: 'white', borderColor: 'red', width: '200px', color: 'Red', height: '43px' }} >
                            <ArrowDownOutlined />Xem thêm
                        </Button>
                        {/* )} */}
                    </div>
                </Col>
            </Row>
        </div>

    )
}

