import { Image, Card, Typography, Col, List } from "antd"
import { Link } from "react-router-dom";
import { CalendarOutlined } from '@ant-design/icons';

const MagazineItem = ({ Data }) => {

    return (
        <>
            <Col
                style={{ display: 'flex' }}
            >
                <Card
                    hoverable
                    style={{ width: '50%', height: '500px' }}
                    cover={<Image style={{ height: '300px' }} src={Data[0].picture} />}
                >

                    <Link to={`/chi-tiet-Blog/${Data[0]._id}`}>
                        <Card.Meta
                            description={
                                <>
                                    {<CalendarOutlined style={{ verticalAlign: 'middle', marginRight: 8 }} />}
                                    <span style={{ verticalAlign: 'middle' }}>
                                        {Data[0].date?.split("-") ? (Data[0].date?.split("-")[2].substr(0, 2) + '-' + Data[0].date?.split("-")[1] + '-' + Data[0].date?.split("-")[0]) : ''}
                                    </span>
                                    <p>
                                        {Data[0].content}
                                    </p>
                                </>
                            }
                            title={<Typography.Title level={2}>{Data[0].title}</Typography.Title>}
                        />

                    </Link>
                </Card>
                <Card
                    hoverable
                    style={{ width: '50%', height: '500px', marginLeft: '30px' }}
                    cover={<Image style={{ height: '300px' }} src={Data[1].picture} />}
                >

                    <Link to={`/chi-tiet-Blog/${Data[1]._id}`}>
                        <Card.Meta
                            description={
                                <>
                                    {<CalendarOutlined style={{ verticalAlign: 'middle', marginRight: 8 }} />}
                                    <span style={{ verticalAlign: 'middle' }}>
                                        {Data[1].date?.split("-") ? (Data[1].date?.split("-")[2].substr(0, 2) + '-' + Data[1].date?.split("-")[1] + '-' + Data[1].date?.split("-")[0]) : ''}
                                    </span>
                                    <p>{Data[1].content}</p>
                                </>
                            }
                            title={<Typography.Title level={2}>{Data[1].title}</Typography.Title>}
                        />

                    </Link>
                </Card>
            </Col>


        </>
    )
}
export default MagazineItem;