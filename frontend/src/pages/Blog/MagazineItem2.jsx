import { Card, Col, Image, Row} from "antd";
import { Link } from "react-router-dom";
import { CalendarOutlined } from '@ant-design/icons';



const MagazineItem2 = ({ data }) => {
    return (
        <>
            <Row gutter={30}>
                {data.map((e) =>

                    <Col span={8} style={{ marginTop: '30px' }} >
                        <Card
                            hoverable
                            style={{ width: '100%', height: '500px' }}
                            cover={<Image style={{ height: '300px' }} src={e.picture} />}
                        >
                            <Link style={{ color: 'red' }} to={`/chi-tiet-Blog/${e._id}`}>
                                <Card.Meta
                                    ellipsis
                                    title={<h1 style={{fontWeight:'600'}}>{e.title}</h1>}
                                    description={
                                        <>
                                            {<CalendarOutlined style={{ verticalAlign: 'middle', marginRight: 8 }} />}
                                            <span style={{ verticalAlign: 'middle' }}>
                                                {e.date?.split("-") ? (e.date?.split("-")[2].substr(0, 2) + '-' + e.date?.split("-")[1] + '-' + e.date?.split("-")[0]) : ''}
                                            </span>
                                            <p>
                                                {e.content}
                                            </p>
                                        </>
                                    }
                                />
                            </Link>
                        </Card>
                    </Col>
                )}

            </Row>

        </>
    )
}

export default MagazineItem2;