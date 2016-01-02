var table_data = []
var results = [];

$(document).ready(function() 
{
	$('#fare-chart').DataTable({
		      			"bPaginate": false,
		 				"bInfo" : false
		 		});
	$('<div id="overlay"/>').css({
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'block',
        width: $(window).width() + 'px',
        height: $(window).height() + 'px',
        background: 'url(/static/gif/ajax-loader-circle.gif) no-repeat center'
    }).hide().appendTo('body');


	$('#getFare').click(function() 
		{
		  
	      console.log(location_src);
	      console.log(location_dst);
	      $('#fare-chart').dataTable().fnClearTable();

	      // if((document.getElementById("pac-source").value.match(/^\s*$/)) || (document.getElementById("pac-destination").value.match(/^\s*$/)))
	      // {
	      // 		$('#overlay').hide();
	      // 		$('#getFare').show();
	      // 		return;
	      // }
	      var base_url ="https://api.uber.com/v1/estimates/price?server_token=ESzT96BS6wpL-wJO_bpAKttnGgQHzseqiCsYwK3u";
	      var src_lat = location_src.geometry.location.lat();
	      var src_lng = location_src.geometry.location.lng();
	      var dst_lat = location_dst.geometry.location.lat();
	      var dst_lng = location_dst.geometry.location.lng();
	      var currency_code;


	      base_url += "&&start_latitude="+src_lat+"&&start_longitude="+src_lng;
	      base_url += "&&end_latitude="+dst_lat+"&&end_longitude="+dst_lng;

	      console.log(base_url);
	      table_data = [];
	      $('#overlay').show();
		  $('#getFare').hide();
	      jQuery.ajax({
	            url: base_url,
	            type: "GET",
	            contentType: 'application/json; charset=utf-8',
	       
	            success: function(resultData) {

	            	console.log(resultData);
	            	results = resultData['prices'];
	            	var distance = results[0]['distance']*1.60934;
	      			var time = results[0]['duration'];

	            	for(i = 0; i < results.length; i++)
	            	{
	            		var temp;
	            		if(results[i]['currency_code']!=null)
	            		{
							temp=[results[i]['display_name']
									,results[i]['surge_multiplier']+" x"
									,results[i]['minimum']
									,results[i]['low_estimate']
									,results[i]['high_estimate']
								];
							currency_code = " "+results[i]["currency_code"];
						}
						else
						{
							temp = [results[i]['display_name'], '-', '-', '-', '-'];
						}
						table_data.push(temp);
	            	}
	            	table_data.reverse();
	            	var time_round = (time/60);
	            	
	            	$('#dist-time-label').html("<b>Distance</b> : "+distance.toFixed(2)+" km &nbsp; &nbsp; &nbsp; &nbsp;   <b>Time</b> : "+time_round.toFixed(2)+" minutes "+" &nbsp; &nbsp; &nbsp; &nbsp; <b>Currency</b> :"+currency_code);
	            	$('#fare-chart').dataTable().fnClearTable();
    				$('#fare-chart').dataTable().fnAddData(table_data);
    				$('#fare-chart').dataTable().fnAdjustColumnSizing();
    				$('#overlay').hide();
    				$('#getFare').show();
	            },
	            error : function(jqXHR, textStatus, errorThrown) {
	            	$('#dist-time-label').html(" ");
	            	$('#fare-chart').dataTable().fnClearTable();
	            	$('#overlay').hide();
	            	$('#getFare').show();
	            },

	            timeout: 120000,
	      });

		});

});





