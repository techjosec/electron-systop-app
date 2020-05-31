const path = require( `path` );
const osu = require( `node-os-utils` );

const { cpu } = osu;
const { mem } = osu;
const { os } = osu;
const notifier = require( `node-notifier` );

const cpuOverload = 15;
const alertFrequency = 1;

function secondsToDhms( seconds )
{
	const intSeconds = +seconds;
	const d = Math.floor( intSeconds / ( 3600 * 24 ) );
	const h = Math.floor( ( intSeconds % ( 3600 * 24 ) ) / 3600 );
	const m = Math.floor( ( intSeconds % 3600 ) / 60 );
	const s = Math.floor( intSeconds % 60 );

	return `${d}d, ${h}h, ${m}m, ${s}s`;
}

function mustNotify()
{}

function notifyUser( options )
{
	notifier.notify( {
		...options,
		icon: path.join( __dirname, `img`, `icon.png` ),
	} );
}

setInterval( () =>
{
	cpu.usage().then( ( info ) =>
	{
		document.getElementById( `cpu-usage` ).innerText = `${info}%`;
		document.getElementById( `cpu-progress` ).style.width = `${info}%`;

		if ( info >= cpuOverload )
		{
			document.getElementById( `cpu-progress` ).style.background = `red`;
			if ( mustNotify() )
			{
				notifyUser(
					{
						title   : `CPU Overload`,
						message : `CPU over ${cpuOverload}%`,
					},
				);
			}
		}
		else
		{
			document.getElementById( `cpu-progress` ).style.background = `#30c88b`;
		}
	} );

	cpu
		.free()
		.then(
			( info ) =>
			{
				document.getElementById( `cpu-free` ).innerText = `${info}%`;
			},
		);
}, 2000 );

setInterval( () =>
{
	document.getElementById( `sys-uptime` ).innerText = secondsToDhms( os.uptime() );
}, 1000 );

document.getElementById( `cpu-model` ).innerText = cpu.model();
document.getElementById( `comp-name` ).innerText = os.hostname();
document.getElementById( `os` ).innerText = `${os.type()} ${os.arch()}`;
mem.info().then( ( info ) =>
{
	document.getElementById( `sys-mem` ).innerText = `${info.totalMemMb} GB`;
} );
