

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url:'/admin/company/getall'},
        "columns": [
        { data: 'name', "width": "15%" },
        { data: 'streetAddress', "width": "15%" },
        { data: 'city', "width": "15%" },
        { data: 'province', "width": "15%" },
        { data: 'phoneNumber', "width": "15%" },
            {
                data: 'id',
                "render": function (data) {
                    return `
                    <div class="w-75 btn-group" role="group">
                        <a href="/admin/company/upsert?id=${data}" class="icons-group mr-3"><i class="bi bi-pencil-square"></i></a >
                        <a onClick="Delete('/admin/company/delete/${data}')" class="icons-group"><i class="bi bi-trash3"></i></a>
                    </div >`;
                },
                "width": "5%"
            }
        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    dataTable.ajax.reload();
                    new Notyf().success(data.message);
                }
            })
        }
    })
}

