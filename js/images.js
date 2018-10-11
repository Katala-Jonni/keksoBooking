'use strict';
(function () {
  var tools = window.tool;
  var errorType = window.modalError;
  var files = tools.mainForm.querySelectorAll('input[type="file"]');
  var titleAvatar = document.querySelector('.ad-form-header__preview img');
  var defaultSrc = titleAvatar.src;
  var imageBox = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var indicator = true;

  var getAvatarImage = function (reader) {
    titleAvatar.src = reader.result;
  };

  var removePhoto = function () {
    var container = photoContainer.querySelectorAll('.ad-form__photo');
    container.forEach(function (item) {
      item.remove();
    });
    photoContainer.appendChild(imageBox);
    titleAvatar.src = defaultSrc;
  };

  var showLastBox = function () {
    var boxPhoto = photoContainer.querySelector('.ad-form__photo');
    if (!boxPhoto) {
      photoContainer.appendChild(imageBox);
    }
  };

  var getMultipleImage = function (reader) {
    var imagesBoxClone = imageBox.cloneNode(true);
    imagesBoxClone.addEventListener('dblclick', function (evt) {
      var element = evt.currentTarget;
      element.remove();
      showLastBox();
    });
    var img = document.createElement('img');
    img.classList.add(tools.boxFotoClass);
    img.src = reader.result;
    imagesBoxClone.appendChild(img);
    photoContainer.appendChild(imagesBoxClone);
    imageBox.remove();
  };

  var fieldName = {
    'avatar': getAvatarImage,
    'images': getMultipleImage
  };

  var showImage = function (element, dragElement) {
    Array.from(element.files).forEach(function (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          element.name = element.name ? element.name : dragElement.name;
          fieldName[element.name](reader);
        });
        reader.readAsDataURL(file);
      } else {
        var text = 'Поддерживаемые форматы ' + FILE_TYPES.join(', ');
        errorType(text);
      }
    });
  };

  var onFileChange = function (evt) {
    showImage(evt.target);
  };
  files.forEach(function (item) {
    item.addEventListener('change', onFileChange);
  });


  /* Перетаскивание картинки */
  var onFileDrop = function (evt) {
    if (indicator) {
      return;
    }
    evt.preventDefault();
    var element = evt.target.parentElement.querySelector('input');
    showImage(evt.dataTransfer, element);
    evt.target.style.border = '';

  };

  var dragBox = document.querySelectorAll('.ad-form__field, .ad-form__upload');
  dragBox.forEach(function (item) {
    item.addEventListener('dragover', function (evt) {
      evt.preventDefault();
      indicator = tools.mainForm.classList.contains(tools.formDisabledClass);
      if (!indicator) {
        evt.target.style.border = '1px solid red';
      }
    });
    item.addEventListener('dragleave', function (evt) {
      evt.preventDefault();
      evt.target.style.border = '';
    });
    item.addEventListener('drop', onFileDrop);
  });

  window.image = {
    remove: removePhoto,
  };

})();
