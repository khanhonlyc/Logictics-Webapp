import { Avatar, Card, Typography } from 'antd'
import { Link } from 'react-router-dom';
const { Meta } = Card

const ListCardSmall = ({ data }) => {
    const Newsdata = data?.slice(0, 4);
    if (data?.length>4) {
        return (
            <>
                {Newsdata?.map((e) =>

                    <div style={{ marginTop: '0px', marginBottom: '10px' }}>

                        <Card
                            hoverable
                            style={{ height: '143px', paddingTop: 0 }}
                        >

                            <Link style={{ color: 'red' }} to={`/chi-tiet-Blog/${e._id}`}>
                                <Meta
                                    ellipsis
                                    avatar={
                                        <Avatar
                                            style={{ margin: 0, padding: 0, height: '80px', width: '80px' }}
                                            shape='square'
                                            size={{ md: 140, lg: 140, xl: 140, xll: 140 }}
                                            src={e.picture}
                                        />
                                    }
                                    title={<h1>{e.title}</h1>}
                                    description={
                                        <>
                                            <p>
                                                {e.content}
                                            </p>
                                        </>
                                    }
                                />
                            </Link>

                        </Card>


                    </div>
                )}
            </>
        )
    }
    else {
        return (
            <>
                {data?.map((e) =>

                    <div style={{ marginTop: '0px', marginBottom: '10px' }}>

                        <Card
                            hoverable
                            style={{ height: '143px', paddingTop: 0 }}
                        >

                            <Link style={{ color: 'red' }} to={`/chi-tiet-Blog/${e._id}`}>
                                <Meta
                                    ellipsis
                                    avatar={
                                        <Avatar
                                            style={{ margin: 0, padding: 0, height: '80px', width: '80px' }}
                                            shape='square'
                                            size={{ md: 140, lg: 140, xl: 140, xll: 140 }}
                                            src={e.image}
                                        />
                                    }
                                    title={<h1>{e.title}</h1>}
                                    description={
                                        <>
                                            <p>
                                                {e.content}
                                            </p>
                                        </>
                                    }
                                />
                            </Link>

                        </Card>


                    </div>
                )}
            </>
        )
    }
}

export default ListCardSmall;