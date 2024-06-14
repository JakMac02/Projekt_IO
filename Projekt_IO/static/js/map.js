var map = L.map('map').setView([52.222, 21.01], 16);

			console.log(map)
			const key = 'jGfOqGPMv9RV54EWyXtE';
			const mtLayer = L.maptilerLayer({
				apiKey: key,
				style: "e6471f4f-29f8-4212-9120-26a47d13b86a",
			}).addTo(map);