const { BrowserWindow } = require( `electron` );
const path = require( `path` );

class MainWindow extends BrowserWindow
{
	constructor( file, isDev )
	{
		super( {
			title          : `SysTop`,
			width          : isDev ? 800 : 500,
			height         : 600,
			icon           : path.join( `assets`, `icons`, `icon.png` ),
			resizable      : !!isDev,
			show           : false,
			opacity        : 0.9,
			webPreferences : {
				nodeIntegration: true,
			},
		} );

		this.loadFile( file );

		if ( isDev )
		{
			this.webContents.openDevTools();
		}
	}
}

module.exports = MainWindow;
