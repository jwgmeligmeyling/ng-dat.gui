#dat.GUI
[dat.GUI](https://github.com/dataarts/dat.gui) modified for angular. Looks the same as the [original](http://workshop.chromeexperiments.com/examples/gui) examples, but uses Angular directives to create the GUI.

----

##Packaged Builds
The easiest way to use dat.GUI in your code is by using the built source at `../dist/ng-dat.gui.js`.

In your `head` tag, include the following code:
```
<link rel="stylesheet" href="../dist/ng-dat.gui.css"/>
<script src="../bower_components/angular/angular.min.js" type="application/javascript"></script>
<script src="../bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js" type="application/javascript"></script>
<script src="../dist/ng-dat.gui.js" type="application/javascript"></script>
```

----

##Using dat.GUI with require.js
*Not supported yet, PR's are welcome!*

----

## Usage examples
### Simple form
```html
<dat-gui>
	<dat-gui-control property-name="Wiehi">
		<input type="text"/>
	</dat-gui-control>

	<dat-gui-control property-name="Speed" ng-init="slider.value = 5.2">
		<dat-gui-slider ng-model="slider.value" min="0" max="50"/>
	</dat-gui-control>

	<dat-gui-control property-name="Wiehi">
		<input type="checkbox"/>
	</dat-gui-control>
</dat-gui>
```

### GUI with folders
```html
<dat-gui>
	<dat-gui-folder title="My Folder">
		<dat-gui-control property-name="Wiehi">
    		<input type="text"/>
    	</dat-gui-control>

    	<dat-gui-control property-name="Speed" ng-init="slider.value = 5.2">
    		<dat-gui-slider ng-model="slider.value" min="0" max="50"/>
    	</dat-gui-control>

    	<dat-gui-control property-name="Wiehi">
    		<input type="checkbox"/>
    	</dat-gui-control>
	</dat-gui-folder>

	<dat-gui-folder title="My Folder">
		<dat-gui-control property-name="Wiehi">
    		<select>
    			<option ng-repeat="i in [1,2,3]" ng-bind="i"></option>
    		</select>
    	</dat-gui-control>

    	<dat-gui-control property-name="Wiehi" type="function"></dat-gui-control>
	</dat-gui-folder>
</dat-gui>
```

### Date pickers
The included date picker has been removed to make the code more lightweight.
If a color picker is needed, the framework can be combined with [angular-bootstrap-colorpicker](https://github.com/buberdds/angular-bootstrap-colorpicker) to support date pickers.

```html
<dat-gui>
		<dat-gui-control property-name="Wiehi" ng-init="rgbPicker.color = '#ff0000'" >
			<input colorpicker ng-model="rgbPicker.color" type="text" ng-style="{ 'background': rgbPicker.color }">
		</dat-gui-control>

		<dat-gui-control property-name="Wiehi" ng-init="rgbPicker.color2 = '#ff0000'" >
			<input colorpicker ng-model="rgbPicker.color2" type="text" ng-style="{ 'background': rgbPicker.color2}">
		</dat-gui-control>
</dat-gui>
```