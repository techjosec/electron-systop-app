const Swal = require( `sweetalert2` );

const settingsForm = document.getElementById( `settings-form` );
/** Get settings */
// eslint-disable-next-line no-undef
ipcRenderer.on( `settings:get`, ( _e, settings ) =>
{
	document.getElementById( `cpu-overload` ).value = settings.cpuOverload;
	document.getElementById( `alert-frequency` ).value = settings.alertFrequency;
} );

function showAlert( message )
{
	Swal.fire(
		{
			title       : message,
			toast       : true,
			icon        : `success`,
			timer       : 2000,
			background  : `#333`,
			customClass :
            { title: `alert-title` },
		},
	);


	// const alert = document.getElementById( `alert` );
	// alert.classList.remove( `hide` );
	// alert.classList.add( `alert` );
	// alert.innerText = message;

	// setTimeout(
	// () =>
	// {
	// alert.classList.add( `hide` );
	// }, 3000,
	// );
}

/** Submit settings */
settingsForm.addEventListener( `submit`, ( e ) =>
{
	e.preventDefault();

	const cpuOverload = document.getElementById( `cpu-overload` ).value;
	const alertFrequency = document.getElementById( `alert-frequency` ).value;

	// eslint-disable-next-line no-undef
	ipcRenderer.send( `settings:set`, { cpuOverload, alertFrequency } );

	showAlert( `Settings updated` );
} );
