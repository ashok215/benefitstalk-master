var currentId = null;
var dependents = [
    {
        Id: '0000-0000-0000-0001',
        FirstName: 'Meg',
        LastName: 'Miller',
        Relationship: 'Spouse',
        Sex: 'Female',
        Birthdate: '2/12/1987',
        SSN: '000-01-6789'
    },
    {
        Id: '0000-0000-0000-0002',
        FirstName: 'Lily',
        LastName: 'Miller',
        Relationship: 'Child',
        Sex: 'Female',
        Birthdate: '4/5/2012',
        SSN: '000-02-1578'
    }
];
$(function () {
    $('#AddDependent').on('click', function () {
        currentId = null;
        $('#EditDependent form input, #EditDependent form select').val('');
        $('#EditDependent [name="Id"]').val(guid());
        $('#EditDependent').modal('show');
    });
    $('#SaveDependent').on('click', function () {
        var dependent = $('#EditDependent form').serializeJSON();

        if (currentId) {
            var index = dependents.findIndex((dependent) => {
                return dependent.Id === currentId;
            });
            dependents[index] = dependent;
        } else {
            dependents.push(dependent);
        }
        UpdateCards();
        $('#EditDependent').modal('hide')
    });
    $('#RemoveDependent').on('click', function () {
        var index = dependents.findIndex((dependent) => {
            return dependent.Id === currentId;
        });
        if (index > -1) {
            dependents.splice(index, 1);
            UpdateCards();
        }
        $('#ConfirmRemoveDependent').modal('hide')
    });

    UpdateCards();

    $('select').select2({ placeholder: '' });
    $('[name="SSN"]').inputmask({ mask: "999-99-9999" });

});

function UpdateCards() {
    $('#Dependents').empty();

    var index = 0;
    var card = '';
    for (var dependent of dependents) {

        if (index === 0) {
            card += '<div class="row my-3 card-deck no-gutters">';
        }
        card +=
            `<div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <div class="card-body">
                            <div class="row no-gutters">
                                <div class="col-9">
                                    <h3 class="card-title">${dependent.FirstName} ${dependent.LastName}</h3>
                                </div>
                                <div class="col-3">
                                    <a href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        <i class="fa fa-ellipsis-h fa-2x gray-label pull-right"></i>
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item edit-dependent" data-id="${dependent.Id}" href="#">Edit</a>
                                        <a class="dropdown-item remove-dependent" data-id="${dependent.Id}" href="#">Remove</a>
                                    </div>
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Relationship</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    ${dependent.Relationship}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Gender</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    ${dependent.Sex}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>Birthdate</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    ${dependent.Birthdate}
                                </div>
                            </div>
                            <div class="row no-gutters gray-label">
                                <div class="col" style="display: flex">
                                    <span>SSN</span>
                                    <span class="mx-2 dashed-middle">&nbsp;</span>
                                </div>
                                <div class="col">
                                    xxx-xx-${dependent.SSN.substring(7)}
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
        } else if (index === (dependents.length - 1)) {
            card += '</div>'
        }
        index++;
    }
    $('#Dependents').append(card);


    $('.remove-dependent').on('click', function () {
        currentId = $(this).data().id;
        $('#ConfirmRemoveDependent').modal('show')
    });

    $('.edit-dependent').on('click', function () {
        $('#EditDependent form input, #EditDependent form select').val('');

        currentId = $(this).data().id;
        var dependent = dependents.find((dependent) => {
            return dependent.Id === currentId;
        });
        $('#EditDependent [name="FirstName"]').val(dependent.FirstName);
        $('#EditDependent [name="LastName"]').val(dependent.LastName);
        $('#EditDependent [name="Relationship"]').val(dependent.Relationship);
        $('#EditDependent [name="Sex"]').val(dependent.Sex);
        $('#EditDependent [name="Birthdate"]').val(dependent.Birthdate);
        $('#EditDependent [name="SSN"]').val(dependent.SSN);

        $('#EditDependent').modal('show');
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