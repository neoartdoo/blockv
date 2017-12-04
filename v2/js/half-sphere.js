var controls, scene, camera, renderer;
var light, directionalLight;
var leftClipPlane, rightClipPlane;
var leftGroup = new THREE.Group();
var rightGroup = new THREE.Group();

var innerColor = 0xff0000, outerColor = 0xff9900;
var innerColorRight = 0x0066ff, outerColorRight = 0x0011ff;
var innerSize = 55, outerSize = 60;

var sphereWireframeInnerLeft, sphereWireframeOuterLeft, sphereGlassInnerLeft, sphereGlassOuterLeft;
var particlesOuterLeft, particlesInnerLeft, starFieldLeft;

var sphereWireframeInnerRight, sphereWireframeOuterRight, sphereGlassInnerRight, sphereGlassOuterRight;
var particlesOuterRight, particlesInnerRight, starFieldRight;

var time = new THREE.Clock();

var leftSphereX, rightSphereX, span;
var Empty = Object.freeze([]);

var scrollingStart = false;
var merged = false;


function init() {
	scene = new THREE.Scene();

	var rate = $('#circlesWrapper').width() / $('#circlesWrapper').height();
	camera = new THREE.OrthographicCamera(-160 * rate, 160 * rate, 160, -160, 1, 100);
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

	renderer.setClearColor( 0xffffff, 0 ); // background
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderSingleSided = false;

	renderer.setSize($('#circlesWrapper').width(), $('#circlesWrapper').height());
	document.getElementById('circlesWrapper').appendChild(renderer.domElement);

	// Lights
	light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set( 0, 128, 128 );
	scene.add( directionalLight );

	leftSphereX = -(160 * rate) / 6 * 5, rightSphereX = -leftSphereX;
	// rightSphereX = 0, leftSphereX = 0
	span = 0;

	leftClipPlane = new THREE.Plane(new THREE.Vector3(-leftSphereX, 0, 0), 1);
	rightClipPlane = new THREE.Plane(new THREE.Vector3(-rightSphereX, 0, 0), 1);
	clipPlanes = [leftClipPlane, rightClipPlane];

	// Sphere Wireframe Inner
	sphereWireframeInnerLeft = new THREE.Mesh(
		new THREE.IcosahedronGeometry( innerSize, 2 ),
		new THREE.MeshLambertMaterial({ 
			color: innerColor,
			wireframe: true,
			transparent: true,
			// clippingPlanes: [leftClipPlane]
		})
	);
	// leftGroup.add(sphereWireframeInnerLeft);

	sphereWireframeInnerRight = new THREE.Mesh(
		new THREE.IcosahedronGeometry( innerSize, 2 ),
		new THREE.MeshLambertMaterial({ 
			color: innerColorRight,
			wireframe: true,
			transparent: true,
			// clippingPlanes: [rightClipPlane]
		})
	);
	rightGroup.add(sphereWireframeInnerRight);

	// Sphere Wireframe Outer
	sphereWireframeOuterLeft = new THREE.Mesh(
		new THREE.IcosahedronGeometry( outerSize, 3 ),
		new THREE.MeshLambertMaterial({ 
			color: outerColor,
			wireframe: true,
			transparent: true,
			// clippingPlanes: clipPlanes
		})
	);
	// leftGroup.add(sphereWireframeOuterLeft);

	sphereWireframeOuterRight = new THREE.Mesh(
		new THREE.IcosahedronGeometry( outerSize, 3 ),
		new THREE.MeshLambertMaterial({ 
			color: outerColorRight,
			wireframe: true,
			transparent: true
		})
	);
	// rightGroup.add(sphereWireframeOuterRight);

	// Sphere Glass Inner
	sphereGlassInnerLeft = new THREE.Mesh(
		new THREE.SphereGeometry( innerSize, 32, 32 ),
		new THREE.MeshPhongMaterial({ 
			color: innerColor,
			transparent: true,
			shininess: 25,
			opacity: 0.3,
			// clippingPlanes: [leftClipPlane]
		})
	);
	leftGroup.add(sphereGlassInnerLeft);

	sphereGlassInnerRight = new THREE.Mesh(
		new THREE.SphereGeometry( innerSize, 32, 32 ),
		new THREE.MeshPhongMaterial({ 
			color: innerColorRight,
			transparent: true,
			shininess: 25,
			opacity: 0.4,
			// clippingPlanes: [rightClipPlane]
		})
	);
	rightGroup.add(sphereGlassInnerRight);

	// Sphere Glass Outer
	sphereGlassOuterLeft = new THREE.Mesh(
		new THREE.SphereGeometry( outerSize, 32, 32 ),
		new THREE.MeshPhongMaterial({ 
			color: outerColor,
			transparent: true,
			shininess: 25,
			opacity: 0.3
		})
	);
	//scene.add(sphereGlassOuterLeft);

	// Particles Outer
	var geometry = new THREE.Geometry();
	for (i = 0; i < 35000; i++) {
	  
		var x = -1 + Math.random() * 2;
		var y = -1 + Math.random() * 2;
		var z = -1 + Math.random() * 2;
		var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
		x *= d;
		y *= d;
		z *= d;

		var vertex = new THREE.Vector3(
			x * innerSize,
			y * innerSize,
			z * innerSize
		);

		geometry.vertices.push(vertex);

	}

	particlesOuterLeft = new THREE.Points(geometry, new THREE.PointsMaterial({
			size: 0.1,
			color: outerColor,
			transparent: true,
		})
	);
	leftGroup.add(particlesOuterLeft);

	// particlesOuterRight = new THREE.Points(geometry, new THREE.PointsMaterial({
	// 		size: 0.1,
	// 		color: outerColorRight,
	// 		transparent: true,
	// 	})
	// );
	// rightGroup.add(particlesOuterRight);

	geometry = new THREE.Geometry();
	for (i = 0; i < 35000; i++) {
	  
		var x = -1 + Math.random() * 2;
		var y = -1 + Math.random() * 2;
		var z = -1 + Math.random() * 2;
		var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
		x *= d;
		y *= d;
		z *= d;

		var vertex = new THREE.Vector3(
			x * outerSize,
			y * outerSize,
			z * outerSize
		);

		geometry.vertices.push(vertex);

	}

	outerParticlesOuterLeft = new THREE.Points(geometry, new THREE.PointsMaterial({
			size: 0.1,
			color: outerColor,
			transparent: true,
		})
	);
	// leftGroup.add(outerParticlesOuterLeft);

	// Particles Inner
	geometry = new THREE.Geometry();
	for (i = 0; i < 35000; i++) {
	  
		var x = -1 + Math.random() * 2;
		var y = -1 + Math.random() * 2;
		var z = -1 + Math.random() * 2;
		var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
		x *= d;
		y *= d;
		z *= d;
	  
		var vertex = new THREE.Vector3(
			x * outerSize,
			y * outerSize,
			z * outerSize
		);

		geometry.vertices.push(vertex);

	}

	particlesInnerLeft = new THREE.Points(geometry, new THREE.PointsMaterial({
			size: 0.1,
			color: innerColor,
			transparent: true,
		})
	);
	// leftGroup.add(particlesInnerLeft);

	// particlesInnerRight = new THREE.Points(geometry, new THREE.PointsMaterial({
	// 		size: 0.1,
	// 		color: innerColorRight,
	// 		transparent: true,
	// 	})
	// );
	// rightGroup.add(particlesInnerRight);

	// // starFieldLeft
	var geometry = new THREE.Geometry();

	starFieldLeft = new THREE.Points(geometry, new THREE.PointsMaterial({
			size: 2,
			color: 0xffff99
		})
	);
	leftGroup.add(starFieldLeft);

	starFieldRight = new THREE.Points(geometry, new THREE.PointsMaterial({
			size: 2,
			color: 0x0040ff
		})
	);
	rightGroup.add(starFieldRight);

	scene.add(leftGroup);
	leftGroup.position.set(leftSphereX, 0, 0);
	// leftGroup.rotation.set(0, Math.PI, 0);

	// leftGroup.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);
	// leftClipPlane.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);

	scene.add(rightGroup);
	rightGroup.position.set(rightSphereX, 0, 0);

	renderer.clippingPanes = Empty;
	// renderer.clippingPlanes = clipPlanes;
	renderer.localClippingEnabled = true;

	camera.position.z = 100;
	camera.position.x = 0;
	camera.position.y = 0;
}

var render = function () {
	leftSphere ();
	rightSphere ();

	if (merged) {
		directionalLight.position.x = Math.cos(time.getElapsedTime() / 0.5) * 128;
		directionalLight.position.y = Math.cos(time.getElapsedTime() / 0.5) * 128;
		directionalLight.position.z = Math.sin(time.getElapsedTime() / 0.5) * 128;
	}

	// controls.update();

	renderer.render(scene, camera);
	requestAnimationFrame(render); 

};


function leftSphere () {
	sphereWireframeInnerLeft.rotation.x += 0.002;
	sphereWireframeInnerLeft.rotation.z += 0.002;

	sphereWireframeOuterLeft.rotation.x += 0.001;
	sphereWireframeOuterLeft.rotation.z += 0.001;

	sphereGlassInnerLeft.rotation.y += 0.005;
	sphereGlassInnerLeft.rotation.z += 0.005;

	// sphereGlassOuterLeft.rotation.y += 0.01;
	// sphereGlassOuterLeft.rotation.z += 0.01;

	particlesOuterLeft.rotation.y += 0.0005;
	particlesInnerLeft.rotation.y -= 0.002;

	starFieldLeft.rotation.y -= 0.002;

	var innerShift = Math.abs(Math.cos(( (time.getElapsedTime()+2.5) / 20)));
	var outerShift = Math.abs(Math.cos(( (time.getElapsedTime()+5) / 10)));

	starFieldLeft.material.color.setHSL(Math.abs(Math.cos((time.getElapsedTime() / 10))), 1, 0.5);

	sphereWireframeOuterLeft.material.color.setHSL(0, 1, outerShift);
	// sphereGlassOuterLeft.material.color.setHSL(0, 1, outerShift);
	particlesOuterLeft.material.color.setHSL(0, 1, outerShift);

	sphereWireframeInnerLeft.material.color.setHSL(0.08, 1, innerShift);
	particlesInnerLeft.material.color.setHSL(0.08, 1, innerShift);
	sphereGlassInnerLeft.material.color.setHSL(0.08, 1, innerShift);

	sphereWireframeInnerLeft.material.opacity = Math.abs(Math.cos((time.getElapsedTime()+0.5)/0.9)*0.5);
	sphereWireframeOuterLeft.material.opacity = Math.abs(Math.cos(time.getElapsedTime()/0.9)*0.5);
}

function rightSphere () {
	sphereWireframeInnerRight.rotation.x += 0.002;
	sphereWireframeInnerRight.rotation.z += 0.002;

	sphereWireframeOuterRight.rotation.x += 0.001;
	sphereWireframeOuterRight.rotation.z += 0.001;

	sphereGlassInnerRight.rotation.y += 0.005;
	sphereGlassInnerRight.rotation.z += 0.005;

	// sphereGlassOuterRight.rotation.y += 0.01;
	// sphereGlassOuterRight.rotation.z += 0.01;

	// particlesOuterRight.rotation.y += 0.0005;
	// particlesInnerRight.rotation.y -= 0.002;

	starFieldRight.rotation.y -= 0.002;

	var innerShift = Math.abs(Math.sin(( (time.getElapsedTime() + 1.5) / 30)));
	var outerShift = Math.abs(Math.sin(( (time.getElapsedTime() + 3) / 20)));

	starFieldRight.material.color.setHSL(Math.abs(Math.sin((time.getElapsedTime() / 10))), 1, 0.5);

	sphereWireframeOuterRight.material.color.setHSL(0, 1, outerShift);
	// sphereGlassOuterRight.material.color.setHSL(0, 1, outerShift);
	// particlesOuterRight.material.color.setHSL(0, 1, outerShift);

	// sphereWireframeInnerRight.material.color.setHSL(0.08, 1, innerShift);
	// particlesInnerRight.material.color.setHSL(0.08, 1, innerShift);
	// sphereGlassInnerRight.material.color.setHSL(0.08, 1, innerShift);

	sphereWireframeInnerRight.material.opacity = Math.abs(Math.sin((time.getElapsedTime() + 0.5) / 0.9) * 0.5);
	sphereWireframeOuterRight.material.opacity = Math.abs(Math.sin(time.getElapsedTime() / 0.9) * 0.5);
}


function onWindowResize() {
	camera.aspect = $('#circlesWrapper').width() / $('#circlesWrapper').height();
	camera.updateProjectionMatrix();

	renderer.setSize($('#circlesWrapper').width(), $('#circlesWrapper').height());
	// renderer.setSize(1920, 900);
}

$(document).ready(function () {
	init();
	console.log($('#circlesWrapper').width());
	render();
	window.addEventListener('resize', onWindowResize, false);
	onWindowResize();

	$(window).scroll(function (e) {
		var curPos = $(this).scrollTop();
		var stopPane = false;
		console.log('curPos : ', curPos);

		if (curPos >= 700 && curPos <= 1100) {
			if (!scrollingStart) {
				// $('.callouts').css('position', 'fixed');
				// $('.callouts').css('top', '0px');
				// $('.callouts').css('left', 0);
				// $('.calloutst').css('z-index', 99);

				// $('.blue-sect.circless').css('position', 'fixed');
				// $('.blue-sect.circless').css('top', $('.blue-transparent').height() + 160 + 'px');
				// $('.blue-sect.circless').css('left', 0);
				// $('.blue-sect.circless').css('z-index', 99);

				// $('.transparent-back').show();

				if (leftSphereX >= 0) {
					scrollingStart = true;
					leftSphereX = 0;
					// renderer.clippingPanes = Empty;
					leftGroup.add(sphereWireframeInnerLeft);
					leftGroup.add(outerParticlesOuterLeft);
					leftGroup.add(particlesOuterLeft);
					leftGroup.add(particlesInnerLeft);

					leftGroup.add(sphereWireframeOuterLeft);
					rightGroup.add(sphereWireframeOuterRight);
					rightGroup.visible = false;
					merged = true;
				} else {
					leftSphereX += (curPos - 600) / 20;
					rightSphereX = -leftSphereX;
				}

				if (leftSphereX > -58) {
					stopPane = true;
				}

				if (leftSphereX >= -10) {
					leftSphereX = 0;
				}

				var leftPaneX = rightSphereX + span;
				var rightPaneX = leftSphereX - span;

				leftGroup.position.set(leftSphereX, 0, 0);
				rightGroup.position.set(rightSphereX, 0, 0);

				if (!stopPane) {
					leftClipPlane.set(new THREE.Vector3(leftPaneX, 0, 0), 1);
					rightClipPlane.set(new THREE.Vector3(rightPaneX, 0, 0), 1);
				}
			}
		} else if (curPos < 600) {
			// $('.blue-sect.circless').css('position', 'relative');
			// $('.blue-transparent').css('position', 'relative');
			// $('.blue-sect.circless').css('top', '0px');
		} else {
			// $('.blue-transparent').css('position', 'relative');
			// // $('.blue-transparent').css('top', '64px');
			// // $('.blue-transparent').css('left', 0);
			// $('.blue-transparent').css('z-index', 0);

			// $('.blue-sect.circless').css('position', 'relative');
			// $('.blue-sect.circless').css('top', '0px');
			// // $('.blue-sect.circless').css('left', 0);
			// $('.blue-sect.circless').css('z-index', 0);
			// $('.transparent-back').hide();
		}
	});
});