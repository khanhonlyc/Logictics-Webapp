import { Avatar, Card, Row, Col, Typography } from 'antd'
import { Link } from 'react-router-dom';
import { CalendarOutlined } from '@ant-design/icons';
const { Meta } = Card
const { Title, Text } = Typography

const ListCard = ({ Data }) => {
    return (
        <div>
            {Data.map((e) =>
                <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <Card
                        hoverable
                        style={{ height: '250px' }}
                    >
                        <Link style={{ color: 'red' }} key={e.id} to={`/chi-tiet-Blog/${e._id}`}>
                            <Meta
                                ellipsis
                                avatar={
                                    <Avatar
                                        style={{ marginTop: 0, height: '210px', width: '210px' }}
                                        shape='square'
                                        size={{ md: 140, lg: 140, xl: 140, xll: 140 }}
                                        src={e.picture}
                                    />
                                }
                                title={<Title level={2} >{e.title}</Title>}
                                description={
                                    <>
                                        <p>{e.description}</p>
                                        {<CalendarOutlined style={{ verticalAlign: 'middle', marginRight: 8 }} />}
                                        <Text>
                                            {e.date?.split("-") ? (e.date?.split("-")[2].substr(0, 2) + '-' + e.date?.split("-")[1] + '-' + e.date?.split("-")[0]) : ''}

                                        </Text>
                                        <Link style={{ color: 'red' }} to={`/chi-tiet-Blog/${e._id}`}><br></br>Xem Thêm</Link>
                                    </>
                                }
                            />
                        </Link>

                    </Card>
                </div>

            )}

        </div>
    )
}

export default ListCard;