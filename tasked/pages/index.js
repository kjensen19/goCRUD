import React, {useRef} from 'react';
import {Replicache, TEST_LICENSE_KEY} from 'replicache';
import {useSubscribe} from 'replicache-react';
import {nanoid} from 'nanoid';

const rep = process.browser
  ? new Replicache({
    name: 'chat-user-id',
    licenseKey: TEST_LICENSE_KEY,
    pushURL: '/api/replicache-push',
    pullURL: '/api/replicache-pull',
    })
  : null;

  if (rep) {
    listen(rep);
  }

  export default function Home() {
    return <Chat rep={rep} />;
  }

  function Chat({rep}) {
    const messages = useSubscribe(
      rep,
      async tx => {
        const list = await tx.scan({prefix: 'task/'}).entries().toArray();
        list.sort(([, {order: a}], [, {order: b}]) => a - b);
        return list;
      },
      [],
    );

    const usernameRef =useRef();
    const contentRef = useRef();

    const onSubmit = e => {
      e.preventDefault();
      // TODO: Create message
    };

    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={onSubmit}>
          <input ref={usernameRef} style={styles.username} required />
          says:
          <input ref={contentRef} style={styles.content} required />
          <input type="submit" />
        </form>
        <MessageList messages={messages} />
      </div>
    );
  }

  function MessageList({messages}) {
    return messages.map(([k, v]) => {
      return (
        <div key={k}>
          <b>{v.from}: </b>
          {v.content}
        </div>
      );
    });
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      flex: 0,
      marginBottom: '1em',
    },
    username: {
      flex: 0,
      marginRight: '1em',
    },
    content: {
      flex: 1,
      maxWidth: '30em',
      maring: '0 1em',
    },
  }

  function listen(rep) {
    // TODO: Listen for changes on server
  }