var currentId = null;
var beneficiaries = [
    {
        Id: '0000-0000-0000-0001',
        FirstName: 'Meg',
        LastName: 'Miller',
        Relationship: 'Spouse',
        Sex: 'Female',
        Birthdate: '2/12/1987',
        SSN: '000-01-6789',
        Level: 'Primary',
        Percent: 60

    },
    {
        Id: '0000-0000-0000-0002',
        FirstName: 'Lily',
        LastName: 'Miller',
        Relationship: 'Child',
        Sex: 'Female',
        Birthdate: '4/5/2012',
        SSN: '000-02-1578',
        Level: 'Primary',
        Percent: 40
    }
];  

$(function () {
    $('#AddBeneficiary').on('click', function () {
        currentId = null;
        $('#EditBeneficiary form input, #EditBeneficiary form select').val('');
        $('#EditBeneficiary [name="Id"]').val(guid());
        $('#EditBeneficiary').modal('show');
    });
    $('#SaveBeneficiary').on('click', function () {
        var beneficiary = $('#EditBeneficiary form').serializeJSON();
        if (currentId) {
            var index = beneficiaries.findIndex((beneficiary) => {
                return beneficiary.Id === currentId;
            });
            beneficiaries[index] = beneficiary;
        } else {
            beneficiaries.push(beneficiary);
        }
        UpdateCards();
        $('#EditBeneficiary').modal('hide')
    });
    $('#RemoveBeneficiary').on('click', function () {
        var index = beneficiaries.findIndex((beneficiary) => {
            return beneficiary.Id === currentId;
        });
        if (index > -1) {
            beneficiaries.splice(index, 1);
            UpdateCards();
        }
        $('#ConfirmRemoveBeneficiary').modal('hide')
    });

    UpdateCards();

    $('select').select2({ placeholder: '' });
    $('[name="SSN"]').inputmask({ mask: "999-99-9999" });
});

function UpdateCards() {
    $('#Beneficiaries').empty();

    var index = 0;
    var card = '';
    for (var beneficiary of beneficiaries) {

        if (index === 0) {
            card += '<div class="row my-3 card-deck no-gutters">';
        }
        card +=
            `<div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <div class="card-body">
                            <div class="row no-gutters">
                                <div class="col-9">
                                    <h3 class="card-title">${beneficiary.FirstName} ${beneficiary.LastName}</h3>
                                </div>
                                <div class="col-3">
                                    <a href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h fa-2x gray-label pull-right"></i>
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item edit-beneficiary" data-id="${beneficiary.Id}" href="#">Edit</a>
                                        <a class="dropdown-item remove-beneficiary" data-id="${beneficiary.Id}" href="#">Remove</a>
                                    </div>
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Relationship</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    ${beneficiary.Relationship}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Gender</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    ${beneficiary.Sex}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Birthdate</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    ${beneficiary.Birthdate}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>SSN</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    xxx-xx-${beneficiary.SSN.substring(7)}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Beneficiary</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    xxx-xx-${beneficiary.Level}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Percent</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    ${beneficiary.Percent}%
                                </div>
                            </div>
                            <div class="row no-gutters mt-3">
                                <div class="col yellow-verification">
                                    <i class="fa fa-clock-o""></i> Verification pending
                                </div>
                            </div>

                        </div>
                    </div>
                </div>`;

        if (index !== 0 && (index + 1) % 3 === 0) {
            card += '</div><div class="row my-3 card-deck no-gutters">';
        } else if (index === (beneficiaries.length - 1)) {
            card += '</div>'
        }
        index++;
    }
    $('#Beneficiaries').append(card);


    $('.remove-beneficiary').on('click', function () {
        currentId = $(this).data().id;
        $('#ConfirmRemoveBeneficiary').modal('show')
    });

    $('.edit-beneficiary').on('click', function () {
        $('#EditBeneficiary form input, #EditBeneficiary form select').val('');

        currentId = $(this).data().id;
        var beneficiary = beneficiaries.find((beneficiary) => {
            return beneficiary.Id === currentId;
        });
        $('#EditBeneficiary [name="FirstName"]').val(beneficiary.FirstName);
        $('#EditBeneficiary [name="LastName"]').val(beneficiary.LastName);
        $('#EditBeneficiary [name="Relationship"]').val(beneficiary.Relationship);
        $('#EditBeneficiary [name="Sex"]').val(beneficiary.Sex);
        $('#EditBeneficiary [name="Birthdate"]').val(beneficiary.Birthdate);
        $('#EditBeneficiary [name="SSN"]').val(beneficiary.SSN);

        $('#EditBeneficiary').modal('show');
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

