import { Image, Card, Typography, Col, List } from "antd"
import { Link } from "react-router-dom";
import { CalendarOutlined } from '@ant-design/icons';

const BlogItem = ({ data }) => {
    return (
        <>
            <Col
                style={{ display: 'flex' }}
            >
                <Card
                    hoverable
                    style={{ width: '50%', height: '600px' }}
                    cover={<Image style={{ height: '300px' }} src={data[0].picture} />}
                >

                    <Link to={`/chi-tiet-Blog/${data[0]._id}`}>
                        <Card.Meta
                            description={
                                <>
                                    {<CalendarOutlined style={{ verticalAlign: 'middle', marginRight: 8 }} />}
                                    <Typography.Text >
                                        {data[0].date?.split("-") ? (data[0].date?.split("-")[2].substr(0, 2) + '-' + data[0].date?.split("-")[1] + '-' + data[0].date?.split("-")[0]) : ''}
                                        <br />
                                    </Typography.Text>
                                    <p>{data[0].content}</p>
                                </>
                            }
                            title={<Typography.Title level={2}>{data[0].title}</Typography.Title>}
                        />

                    </Link>
                </Card>
                <Card
                    hoverable
                    style={{ width: '50%', height: '600px', marginLeft: '30px' }}
                    cover={<Image style={{ height: '300px' }} src={data[1].picture} />}
                >

                    <Link to={`/chi-tiet-Blog/${data[1]._id}`}>
                        <Card.Meta
                            description={
                                <>
                                    {<CalendarOutlined style={{ verticalAlign: 'middle', marginRight: 8 }} />}
                                    <Typography.Text >
                                        {data[1].date?.split("-") ? (data[1].date?.split("-")[2].substr(0, 2) + '-' + data[1].date?.split("-")[1] + '-' + data[1].date?.split("-")[0]) : ''}
                                        <br />
                                    </Typography.Text>
                                    <p>{data[1].content}</p>
                                </>
                            }
                            title={<Typography.Title level={2}>{data[1].title}</Typography.Title>}
                        />

                    </Link>
                </Card>
            </Col>


        </>
    )
}
export default BlogItem;