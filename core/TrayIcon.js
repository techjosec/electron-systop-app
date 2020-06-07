const { app, Menu, Tray } = require( `electron` );
const path = require( `path` );

class TrayIcon extends Tray
{
	constructor( mainWindow )
	{
		const icon = path.join( `assets`, `icons`, `tray_icon.png` );
		super( icon );

		this.mainWindow = mainWindow;

		this.on( `click`, this.onClick.bind( this ) );
		this.on( `right-click`, this.onRigthClick.bind( this ) );
	}

	onClick()
	{
		if ( this.mainWindow.isVisible() === true )
		{
			this.mainWindow.hide();
		}
		else
		{
			this.mainWindow.show();
		}
	}

	onRigthClick()
	{
		const contextMenu = Menu.buildFromTemplate( [
			{
				label : `Quit`,
				click : ( ) =>
				{
					app.isQuitting = true;
					app.quit();
				},
			},
		] );

		this.popUpContextMenu( contextMenu );
	}
}

module.exports = TrayIcon;
