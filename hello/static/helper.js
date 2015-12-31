var table_data = []

$(document).ready(function() 
{
	$('#fare-chart').DataTable( {
        data: table_data,
        "bInfo": false,
        "bLengthChange": false,
        "paging":   false,
        columns: [
            { title: "Type" },
            { title: "Surge" },
            { title: "Base" },
            { title: "Minimum" },
            { title: "Maximum" }
        ]
	});

	$('#getFare').click(function() 
		{
		      console.log(location_src);
		      console.log(location_dst);
		      
		      var base_url ="https://api.uber.com/v1/estimates/price?server_token=ESzT96BS6wpL-wJO_bpAKttnGgQHzseqiCsYwK3u";
		      var src_lat = location_src.geometry.location.lat();
		      var src_lng = location_src.geometry.location.lng();
		      var dst_lat = location_dst.geometry.location.lat();
		      var dst_lng = location_dst.geometry.location.lng();


		      base_url += "&&start_latitude="+src_lat+"&&start_longitude="+src_lng;
		      base_url += "&&end_latitude="+dst_lat+"&&end_longitude="+dst_lng;

		      console.log(base_url);

		      jQuery.ajax({
		            url: base_url,
		            type: "GET",
		            contentType: 'application/json; charset=utf-8',
		       
		            success: function(resultData) {

		            	console.log(resultData);
		            	var results = resultData['prices'];
		            	var distance = results[0]['distance'];
		      			var time = results[0]['duration'];

		            	for(i = 0; i < results.length; i++)
		            	{
		            		var temp = [results['display_name'],
		            					results['surge_multiplier'],
				            			results['minimum'],
				            			results['low_estimate'],
		        		    			results['high_estimate']];

		        		    $('#fare-chart').dataTable().fnAddData(temp);
		            	}

		            	$('#dist-time-label').html("<b>Distance</b> : "+distance+" km &nbsp; &nbsp; &nbsp; &nbsp;   <b>Time</b> : "+time+" minutes");

		            },
		            error : function(jqXHR, textStatus, errorThrown) {
		            	//Need to fill-up something here
		            },

		            timeout: 120000,
		      });


		});

});






