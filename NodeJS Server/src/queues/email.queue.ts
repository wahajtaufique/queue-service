import Bull from 'bull';
import emailProcess from '../processes/email.process';
const { ExpressAdapter, createBullBoard, BullAdapter } = require('@bull-board/express');


// https://optimalbits.github.io/bull

const emailQueue = new Bull('email', "redis://127.0.0.1:6379");

const serverAdapter = new ExpressAdapter().setBasePath('/ui');

createBullBoard({
  queues: [new BullAdapter(emailQueue)],
  serverAdapter,
});

// emailQueue.process(emailProcess);

const sendNewEmail = (data: any) => {
    emailQueue.add(data, {
        attempts: 5
    });
};

export {
    sendNewEmail,
    serverAdapter
}