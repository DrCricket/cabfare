var table_data = []
var results = [];

$(document).ready(function() 
{
	$('#fare-chart').DataTable({
		      			"bPaginate": false,
		 				"bInfo" : false
		 		});
	$('#getFare').click(function() 
		{
		      console.log(location_src);
		      console.log(location_dst);
		      $('#fare-chart').dataTable().fnClearTable();

		      var base_url ="https://api.uber.com/v1/estimates/price?server_token=ESzT96BS6wpL-wJO_bpAKttnGgQHzseqiCsYwK3u";
		      var src_lat = location_src.geometry.location.lat();
		      var src_lng = location_src.geometry.location.lng();
		      var dst_lat = location_dst.geometry.location.lat();
		      var dst_lng = location_dst.geometry.location.lng();


		      base_url += "&&start_latitude="+src_lat+"&&start_longitude="+src_lng;
		      base_url += "&&end_latitude="+dst_lat+"&&end_longitude="+dst_lng;

		      console.log(base_url);
		      table_data = [];
		      jQuery.ajax({
		            url: base_url,
		            type: "GET",
		            contentType: 'application/json; charset=utf-8',
		       
		            success: function(resultData) {

		            	console.log(resultData);
		            	results = resultData['prices'];
		            	var distance = results[0]['distance'];
		      			var time = results[0]['duration'];

		            	for(i = 0; i < results.length; i++)
		            	{
		            		
							var temp=[results[i]['display_name']
									,results[i]['surge_multiplier']
									,results[i]['minimum']
									,results[i]['low_estimate']
									,results[i]['high_estimate']
								]
							table_data.push(temp);
		            	}
		            	table_data.reverse();
		            	var time_round = (time/60);
		            	$('#dist-time-label').html("<b>Distance</b> : "+distance+" km &nbsp; &nbsp; &nbsp; &nbsp;   <b>Time</b> : "+time_round.toFixed(2)+" minutes ");
		            	$('#fare-chart').dataTable().fnClearTable();
        				$('#fare-chart').dataTable().fnAddData(table_data);
        				$('#fare-chart').dataTable().fnAdjustColumnSizing();;
		            },
		            error : function(jqXHR, textStatus, errorThrown) {
		            	
		            },

		            timeout: 120000,
		      });

		});

});





