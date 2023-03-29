import Head from 'next/head';
import Layout from '../components/Layout.jsx';
import events from '../data/eventsDB.jsx';

export default function Events() {
    return (
        <Layout>
            <Head>
                <title>Library Events</title>
                <meta name="description" content="View upcoming library events and activities." />
            </Head>
            <h1>Upcoming Library Events</h1> <br/>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.date} at {event.time}</p>
                        <p>{event.location}</p>
                        <p>{event.description}</p> <br/>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
