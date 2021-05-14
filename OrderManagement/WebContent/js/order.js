$(document).ready(function()
{ 
	if ($("#alertSuccess").text().trim() == "") 
 	{ 
 		$("#alertSuccess").hide(); 
 	} 
 	$("#alertError").hide(); 
}); 

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{ 
	// Clear alerts---------------------
 	$("#alertSuccess").text(""); 
 	$("#alertSuccess").hide(); 
 	$("#alertError").text(""); 
 	$("#alertError").hide(); 
 	
	// Form validation-------------------
	var status = validateItemForm(); 
	if (status != true) 
 	{ 
 		$("#alertError").text(status); 
 		$("#alertError").show(); 
 		
 		return; 
 	} 
 	
	// If valid------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT"; 
 	$.ajax( 
 	{ 
 		url : "OrderApi", 
 		type : type, 
 		data : $("#formItem").serialize(), 
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onItemSaveComplete(response.responseText, status); 
 		} 
 	}); 
});

function onItemSaveComplete(response, status)
{ 
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response);
 		console.log(resultSet);
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully saved."); 
 			$("#alertSuccess").show(); 
 			$("#divItemsGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	} 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while saving."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while saving.."); 
 		$("#alertError").show(); 
 	} 
 	
 	$("#hidItemIDSave").val(""); 
 	$("#formItem")[0].reset();
}

// UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{    
	$("#hidItemIDSave").val($(this).data("orderid"));     
	$("#name").val($(this).closest("tr").find('td:eq(2)').text());     
	$("#quantity").val($(this).closest("tr").find('td:eq(3)').text());
	$("#date").val($(this).closest("tr").find('td:eq(4)').text());
	$("#status").val($(this).closest("tr").find('td:eq(5)').text());
	 
}); 

// DELETE =============================================================
$(document).on("click", ".btnRemove", function(event)
{ 
 	$.ajax( 
 	{ 
 		url : "OrderApi", 
 		type : "DELETE", 
 		data : "orderid=" + $(this).data("orderid"),
 		dataType : "text", 
 		complete : function(response, status) 
 		{ 
 			onItemDeleteComplete(response.responseText, status); 
 		} 
 	}); 
});

function onItemDeleteComplete(response, status)
{ 
	console.log(JSON.parse(response));
	if (status == "success") 
 	{ 
 		var resultSet = JSON.parse(response); 
 		
 		if (resultSet.status.trim() == "success") 
 		{ 
 			$("#alertSuccess").text("Successfully deleted."); 
 			$("#alertSuccess").show(); 
 			$("#divItemsGrid").html(resultSet.data); 
 		} 
 		else if (resultSet.status.trim() == "error") 
 		{ 
 			$("#alertError").text(resultSet.data); 
 			$("#alertError").show(); 
 		} 
 	} 
 	else if (status == "error") 
 	{ 
 		$("#alertError").text("Error while deleting."); 
 		$("#alertError").show(); 
 	} 
 	else
 	{ 
 		$("#alertError").text("Unknown error while deleting.."); 
 		$("#alertError").show(); 
 	} 
}

// CLIENT-MODEL========================================================================= 
function validateItemForm() 
{  
	// order name  
	if ($("#name").val().trim() == "")  
	{   
		return "Insert Order Name";  
	} 
 
	// quantity price  
	if ($("#quantity").val().trim() == "")  
	{   
		return "Insert Order Quantity.";  
	} 
	// date  
	if ($("#date").val().trim() == "")  
	{   
		return "Insert Order Date.";  
	}   
	
	// status
	if ($("#status").val().trim() == "")  
	{   
		return "Insert Order Status.";  
	}

	return true; 
}