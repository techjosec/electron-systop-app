const {
	app, BrowserWindow, Menu, ipcMain,
} = require( `electron` );
const Store = require( `./Store` );

// Set env
process.env.NODE_ENV = `development`;

const isDev = process.env.NODE_ENV !== `production`;
const isMac = process.platform === `darwin`;

let mainWindow;
const store = new Store( {
	configName : `user-settings`,
	defaults   : {
		settings: {
			cpuOverload    : 80, // In Perentage
			alertFrequency : 5, // In minuts
		},
	},
} );

function createMainWindow()
{
	mainWindow = new BrowserWindow( {
		title          : `SysTop`,
		width          : isDev ? 800 : 500,
		height         : 600,
		icon           : `./assets/icons/icon.png`,
		resizable      : !!isDev,
		webPreferences : {
			nodeIntegration: true,
		},
	} );

	if ( isDev )
	{
		mainWindow.webContents.openDevTools();
	}

	mainWindow.loadFile( `./app/index.html` );
}

const menu = [
	...( isMac ? [{ role: `appMenu` }] : [] ),
	{
		role: `fileMenu`,
	},
	...( isDev
		? [
			{
				label   : `Developer`,
				submenu : [
					{ role: `reload` },
					{ role: `forcereload` },
					{ type: `separator` },
					{ role: `toggledevtools` },
				],
			},
		]
		: [] ),
];

app.on( `ready`, () =>
{
	createMainWindow();

	mainWindow.webContents.on( `dom-ready`, () =>
	{
		mainWindow.webContents.send( `settings:get`, store.get( `settings` ) );
	} );

	const mainMenu = Menu.buildFromTemplate( menu );
	Menu.setApplicationMenu( mainMenu );
} );

app.on( `window-all-closed`, () =>
{
	if ( !isMac )
	{
		app.quit();
	}
} );

app.on( `activate`, () =>
{
	if ( BrowserWindow.getAllWindows().length === 0 )
	{
		createMainWindow();
	}
} );

ipcMain.on( `settings:set`, ( _e, payload ) =>
{
	store.set( `settings`, payload );

	mainWindow.webContents.send( `settings:get`, payload );
} );

app.allowRendererProcessReuse = true;
