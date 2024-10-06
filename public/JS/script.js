document.addEventListener('DOMContentLoaded', function () {
    const tasks = document.querySelectorAll('.form-check-input');
    const progress = document.getElementById('progress');

    updateProgress();


    tasks.forEach(task => {
        task.addEventListener('change', updateProgress);
    });

    function updateProgress() {
        const totalTasks = tasks.length;
        const completedTasks = document.querySelectorAll('.form-check-input:checked').length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);

        progress.style.setProperty('--percentage', percentage);
        progress.setAttribute('data-percentage', percentage || 0);
    }
});

// Checkbox State Management 

function updateCheckboxState(subjectId, isChecked) {
  fetch('/updateCheckboxState', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subjectId, isChecked })
  }).then(response => {
      if (response.ok) {
          console.log('Checkbox state updated');
      } else {
          console.error('Failed to update checkbox state');
      }
  }).catch(error => {
      console.error('Error:', error);
  });
}


// Flash Timing Set

  setTimeout(() => {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(flash => {
      flash.style.display = 'none';
    });
  }, 5000); // 10000ms = 10 seconds

