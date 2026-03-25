# Changelog

# 1.8.0

  - Add metrics selector.
  - Limit the Python versions to >=3.11.


# 1.7.0

  - Add IoU-like-two-yaw association metric.
  - Make left labels on bar plot one-liners, except `mahalanobis-size-modulated`.
  - Describe and fix the keystroke `2`.


# 1.6.0

  - Calibrating the IoU-like-dia-Mah.
  - Experimental metric using Slater exponent `exp(-d)`.
  - Update dependencies.

# 1.5.0

  - Experimental association metric based on Mahalanobis distance with diagonal covariance.
  - Bugfix the size format wlh means dx, dy, dz with zero rotation.
  - Keystroke "2" results in 4x2 probe box.

# 1.3.2

 - Better description on PyPI. 

# 1.3.0

 - Keystroke "1" resets the reference bounding box to unit size.

# 1.2.0

 - Bug fixing the title initialization in GUI.
 - Reset both bounding boxes to unit boxes.
 - Use kinematic-tracker==20.3.0 (vectorizing GIoU-yaw).
 - Update other dependencies.

# 1.0.0

 - Use kinematic-tracker==20.0.0 (featuring GIoU-yaw metric).
 - Set of metrics are updated according to what available in kt-20.


# 0.5.0

 - Simplify the dependencies (-nuScenes devkit, -pyquaternion & dependencies).
 - Extend the range of Python versions: (>=3.10).

# 0.4.0

 - Move track (probe box) to the *O*rigin upon keystroke `O` (Shift + O).
 - *R*otate the track by 30 degrees upon keystroke `R`  (Shift + R).

# 0.3.0

 - Several metrics are computed at the same time.
 - Horizontal bar plot is produced for the metric values.
 - The process covariance is effectively fixed to its measurement covariance.

# 0.2.4

 - Using `kinematic-tracker==19.3.0` -- the version which is not yanked.

# 0.2.0

 - First version published in PyPI.


# 0.1.0

 - Ensure the scalar part of the quaternions is greater than or equal zero.
 - Using `kinematic-tracker==19.0.0` (first version class-resolved).
 - Set the window title.
 - Report the name of the metric and score value in the axis title.
 - Switch between association metrics with keystroke `m`.
 - The report coordinate mode is switchable with keystroke `c`.
 - The range is changed from `-10..10` to `-5..15`.
 - Compute and report to the text in the figure.
 - Add some boilerplate code for a matplotlib driven GUI app.
 - Add dependencies.
 - Start the Project.

