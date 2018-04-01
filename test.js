import test from 'ava';
import IsOnline from '.';

test.serial('IsOnline is a class', t => {
	t.is(typeof IsOnline, 'function');
	t.throws(() => IsOnline());
	t.notThrows(() => new IsOnline());
});

test.cb('Checks if we are online/offline', t => {
	const checkConnection = new IsOnline();
	t.plan(1);
	checkConnection.on('online', () => {
		t.pass();
		t.end();
	});
	checkConnection.on('offline', () => {
		t.pass();
		t.end();
	});
});
